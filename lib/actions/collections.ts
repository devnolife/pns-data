'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Schemas
const createCollectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  category: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublic: z.boolean().default(true),
})

const updateCollectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required').optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublic: z.boolean().optional(),
})

export async function createCollectionAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      tags: formData.get('tags') as string,
      imageUrl: formData.get('imageUrl') as string,
      isPublic: formData.get('isPublic') === 'true',
    }

    const validatedData = createCollectionSchema.parse(data)

    const collection = await prisma.collection.create({
      data: {
        ...validatedData,
        authorId: currentUser.id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/collections')
    return { success: true, collection }
  } catch (error) {
    console.error('Create collection error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to create collection' }
  }
}

export async function updateCollectionAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const data = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      tags: formData.get('tags') as string,
      imageUrl: formData.get('imageUrl') as string,
      isPublic: formData.get('isPublic') === 'true',
    }

    const validatedData = updateCollectionSchema.parse(data)

    // Check if user owns the collection or is admin
    const existingCollection = await prisma.collection.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingCollection) {
      return { error: 'Collection not found' }
    }

    if (existingCollection.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to update this collection' }
    }

    const updateData: any = {}
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.category !== undefined) updateData.category = validatedData.category
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags
    if (validatedData.imageUrl !== undefined) updateData.imageUrl = validatedData.imageUrl
    if (validatedData.isPublic !== undefined) updateData.isPublic = validatedData.isPublic

    const collection = await prisma.collection.update({
      where: { id: validatedData.id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/collections')
    revalidatePath(`/collections/${validatedData.id}`)
    return { success: true, collection }
  } catch (error) {
    console.error('Update collection error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to update collection' }
  }
}

export async function deleteCollectionAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const existingCollection = await prisma.collection.findUnique({
      where: { id }
    })

    if (!existingCollection) {
      return { error: 'Collection not found' }
    }

    if (existingCollection.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to delete this collection' }
    }

    await prisma.collection.delete({
      where: { id }
    })

    revalidatePath('/collections')
    return { success: true }
  } catch (error) {
    console.error('Delete collection error:', error)
    return { error: 'Failed to delete collection' }
  }
}

export async function getCollectionsAction(page = 1, limit = 10, category?: string, isPublic?: boolean) {
  try {
    const currentUser = await getCurrentUser()

    const where: any = {}
    if (category) where.category = category

    // If user is not logged in, only show public collections
    if (!currentUser) {
      where.isPublic = true
    } else if (isPublic !== undefined) {
      where.isPublic = isPublic
    } else if (currentUser.role !== 'ADMIN') {
      // Non-admin users see public collections and their own collections
      where.OR = [
        { isPublic: true },
        { authorId: currentUser.id }
      ]
    }

    const [collections, total] = await Promise.all([
      prisma.collection.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.collection.count({ where })
    ])

    return {
      success: true,
      collections,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Get collections error:', error)
    return { error: 'Failed to fetch collections' }
  }
}

export async function getCollectionByIdAction(id: string) {
  try {
    const currentUser = await getCurrentUser()

    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    if (!collection) {
      return { error: 'Collection not found' }
    }

    // Check if user can access this collection
    if (!collection.isPublic) {
      if (!currentUser) {
        return { error: 'Unauthorized to view this collection' }
      }
      if (currentUser.role !== 'ADMIN' && collection.authorId !== currentUser.id) {
        return { error: 'Unauthorized to view this collection' }
      }
    }

    return { success: true, collection }
  } catch (error) {
    console.error('Get collection error:', error)
    return { error: 'Failed to fetch collection' }
  }
}

export async function getPublicCollectionsByCategory() {
  try {
    // Get all public collections
    const collections = await prisma.collection.findMany({
      where: {
        isPublic: true
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get all limited collections
    const limitedCollections = await prisma.limitedCollection.findMany({
      where: {
        isActive: true
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Define the categories we want to display
    const categories = [
      {
        id: "latsar-cpns",
        name: "Latsar Aktualisasi CPNS",
        description: "Laporan Aktualisasi Latsar Calon Pegawai Negeri Sipil",
        icon: "🎓",
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "laporan-pka",
        name: "Laporan PKA",
        description: "Laporan Pelatihan Kepemimpinan Administrator",
        icon: "👔",
        color: "from-purple-500 to-pink-500",
      },
      {
        id: "laporan-pkp",
        name: "Laporan PKP",
        description: "Laporan Pelatihan Kepemimpinan Pengawas",
        icon: "🔍",
        color: "from-green-500 to-emerald-500",
      },
      {
        id: "laporan-pkn",
        name: "Laporan PKN",
        description: "Laporan Kepemimpinan Nasional",
        icon: "🏛️",
        color: "from-orange-500 to-red-500",
      }
    ];

    // Group collections by category
    const categorizedCollections = categories.map(category => {
      // Filter collections by category
      const categoryCollections = collections.filter(
        collection => collection.category === category.id
      );

      // Map the collections to the expected format
      const files = categoryCollections.map(collection => ({
        id: collection.id,
        title: collection.title,
        author: collection.author?.name || collection.author?.username || "Unknown",
        year: new Date(collection.createdAt).getFullYear().toString(),
        batch: "General",
        abstract: collection.description || "",
        type: "PDF",
        size: "2.5 MB", // Mock size
        downloadUrl: `/collections/${collection.id}`,
        content: collection.content
      }));

      // Map limited collections with this category
      const limitedFiles = limitedCollections
        .filter(lc => lc.category === category.id)
        .map(lc => ({
          id: lc.id,
          title: lc.title,
          author: lc.author?.name || lc.author?.username || "Unknown",
          year: new Date(lc.createdAt).getFullYear().toString(),
          batch: `Limited (${lc.currentAccess}/${lc.maxAccess})`,
          abstract: lc.description || "",
          type: "PDF",
          size: "3.2 MB", // Mock size
          downloadUrl: `/limited-collections/${lc.id}`,
          content: lc.content,
          isLimited: true,
          maxAccess: lc.maxAccess,
          currentAccess: lc.currentAccess
        }));

      // Combine both types of collections
      const allFiles = [...files, ...limitedFiles];

      return {
        ...category,
        files: allFiles,
        totalFiles: allFiles.length
      };
    });

    return {
      success: true,
      categories: categorizedCollections
    };
  } catch (error) {
    console.error('Get public collections by category error:', error);
    return { error: 'Failed to fetch collections by category' };
  }
}

export async function getAvailableYears() {
  try {
    // Get all public collections
    const collections = await prisma.collection.findMany({
      where: {
        isPublic: true
      },
      select: {
        createdAt: true
      }
    });

    // Get all limited collections
    const limitedCollections = await prisma.limitedCollection.findMany({
      where: {
        isActive: true
      },
      select: {
        createdAt: true
      }
    });

    // Extract years from collections
    const collectionYears = collections.map(c => new Date(c.createdAt).getFullYear());
    const limitedCollectionYears = limitedCollections.map(c => new Date(c.createdAt).getFullYear());

    // Combine and remove duplicates
    const allYears = [...collectionYears, ...limitedCollectionYears];
    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a); // Sort descending (newest first)

    return {
      success: true,
      years: uniqueYears
    };
  } catch (error) {
    console.error('Get available years error:', error);
    return { error: 'Failed to fetch available years' };
  }
}

export async function getPublicCollectionsByYear(year?: number) {
  try {
    // Current year as default if none provided
    const targetYear = year || new Date().getFullYear();

    // Start and end dates for the target year
    const startDate = new Date(targetYear, 0, 1); // January 1st
    const endDate = new Date(targetYear, 11, 31, 23, 59, 59, 999); // December 31st 23:59:59.999

    // Get all public collections for the target year
    const collections = await prisma.collection.findMany({
      where: {
        isPublic: true,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get all limited collections for the target year
    const limitedCollections = await prisma.limitedCollection.findMany({
      where: {
        isActive: true,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Define the categories we want to display
    const categories = [
      {
        id: "latsar-cpns",
        name: "Latsar Aktualisasi CPNS",
        description: "Laporan Aktualisasi Latsar Calon Pegawai Negeri Sipil",
        icon: "🎓",
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "laporan-pka",
        name: "Laporan PKA",
        description: "Laporan Pelatihan Kepemimpinan Administrator",
        icon: "👔",
        color: "from-purple-500 to-pink-500",
      },
      {
        id: "laporan-pkp",
        name: "Laporan PKP",
        description: "Laporan Pelatihan Kepemimpinan Pengawas",
        icon: "🔍",
        color: "from-green-500 to-emerald-500",
      },
      {
        id: "laporan-pkn",
        name: "Laporan PKN",
        description: "Laporan Kepemimpinan Nasional",
        icon: "🏛️",
        color: "from-orange-500 to-red-500",
      }
    ];

    // Group collections by category
    const categorizedCollections = categories.map(category => {
      // Filter collections by category
      const categoryCollections = collections.filter(
        collection => collection.category === category.id
      );

      // Map the collections to the expected format
      const files = categoryCollections.map(collection => ({
        id: collection.id,
        title: collection.title,
        author: collection.author?.name || collection.author?.username || "Unknown",
        year: new Date(collection.createdAt).getFullYear().toString(),
        batch: "General",
        abstract: collection.description || "",
        type: "PDF",
        size: "2.5 MB", // Mock size
        downloadUrl: `/collections/${collection.id}`,
        content: collection.content
      }));

      // Map limited collections with this category
      const limitedFiles = limitedCollections
        .filter(lc => lc.category === category.id)
        .map(lc => ({
          id: lc.id,
          title: lc.title,
          author: lc.author?.name || lc.author?.username || "Unknown",
          year: new Date(lc.createdAt).getFullYear().toString(),
          batch: `Limited (${lc.currentAccess}/${lc.maxAccess})`,
          abstract: lc.description || "",
          type: "PDF",
          size: "3.2 MB", // Mock size
          downloadUrl: `/limited-collections/${lc.id}`,
          content: lc.content,
          isLimited: true,
          maxAccess: lc.maxAccess,
          currentAccess: lc.currentAccess
        }));

      // Combine both types of collections
      const allFiles = [...files, ...limitedFiles];

      return {
        ...category,
        files: allFiles,
        totalFiles: allFiles.length
      };
    });

    // Filter out empty categories
    const nonEmptyCategories = categorizedCollections.filter(cat => cat.totalFiles > 0);

    return {
      success: true,
      categories: nonEmptyCategories,
      year: targetYear,
      totalDocuments: collections.length + limitedCollections.length
    };
  } catch (error) {
    console.error('Get public collections by year error:', error);
    return { error: 'Failed to fetch collections by year' };
  }
} 
