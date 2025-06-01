'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Schemas
const createCollectionSchema = z.object({
  title: z.string().min(1, 'Judul diperlukan'),
  description: z.string().optional(),
  content: z.string().min(1, 'Konten diperlukan'),
  category: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublic: z.boolean().default(true),
})

const updateCollectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Judul diperlukan').optional(),
  description: z.string().optional(),
  content: z.string().min(1, 'Konten diperlukan').optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublic: z.boolean().optional(),
})

export async function createCollectionAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Tidak memiliki akses' }
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

    const collection = await prisma.collections.create({
      data: {
        id: crypto.randomUUID(),
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        category: validatedData.category,
        tags: validatedData.tags,
        image_url: validatedData.imageUrl,
        is_public: validatedData.isPublic,
        author_id: currentUser.id,
        updated_at: new Date(),
      },
      include: {
        users: {
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
    return { error: 'Gagal membuat koleksi' }
  }
}

export async function updateCollectionAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Tidak memiliki akses' }
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
    const existingCollection = await prisma.collections.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingCollection) {
      return { error: 'Koleksi tidak ditemukan' }
    }

    if (existingCollection.author_id !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Tidak memiliki akses untuk mengubah koleksi ini' }
    }

    const updateData: any = { updated_at: new Date() }
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.category !== undefined) updateData.category = validatedData.category
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags
    if (validatedData.imageUrl !== undefined) updateData.image_url = validatedData.imageUrl
    if (validatedData.isPublic !== undefined) updateData.is_public = validatedData.isPublic

    const collection = await prisma.collections.update({
      where: { id: validatedData.id },
      data: updateData,
      include: {
        users: {
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
    return { error: 'Gagal mengubah koleksi' }
  }
}

export async function deleteCollectionAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Tidak memiliki akses' }
    }

    const existingCollection = await prisma.collections.findUnique({
      where: { id }
    })

    if (!existingCollection) {
      return { error: 'Koleksi tidak ditemukan' }
    }

    if (existingCollection.author_id !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Tidak memiliki akses untuk menghapus koleksi ini' }
    }

    await prisma.collections.delete({
      where: { id }
    })

    revalidatePath('/collections')
    return { success: true }
  } catch (error) {
    console.error('Delete collection error:', error)
    return { error: 'Gagal menghapus koleksi' }
  }
}

export async function getCollectionsAction(page = 1, limit = 10, category?: string, isPublic?: boolean) {
  try {
    const currentUser = await getCurrentUser()

    const where: any = {}
    if (category) where.category = category

    // If user is not logged in, only show public collections
    if (!currentUser) {
      where.is_public = true
    } else if (isPublic !== undefined) {
      where.is_public = isPublic
    } else if (currentUser.role !== 'ADMIN') {
      // Non-admin users see public collections and their own collections
      where.OR = [
        { is_public: true },
        { author_id: currentUser.id }
      ]
    }

    const [collections, total] = await Promise.all([
      prisma.collections.findMany({
        where,
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.collections.count({ where })
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
    return { error: 'Gagal mengambil koleksi' }
  }
}

export async function getCollectionByIdAction(id: string) {
  try {
    const currentUser = await getCurrentUser()

    const collection = await prisma.collections.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    if (!collection) {
      return { error: 'Koleksi tidak ditemukan' }
    }

    // Check if user can access this collection
    if (!collection.is_public) {
      if (!currentUser) {
        return { error: 'Tidak memiliki akses untuk melihat koleksi ini' }
      }
      if (currentUser.role !== 'ADMIN' && collection.author_id !== currentUser.id) {
        return { error: 'Tidak memiliki akses untuk melihat koleksi ini' }
      }
    }

    return { success: true, collection }
  } catch (error) {
    console.error('Get collection error:', error)
    return { error: 'Gagal mengambil koleksi' }
  }
}

export async function getPublicCollectionsByCategory() {
  try {
    // Get all public collections
    const collections = await prisma.collections.findMany({
      where: {
        is_public: true
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Get all limited collections
    const limitedCollections = await prisma.limited_collections.findMany({
      where: {
        is_active: true
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
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
        (collection: any) => collection.category === category.id
      );

      // Map the collections to the expected format
      const files = categoryCollections.map((collection: any) => ({
        id: collection.id,
        title: collection.title,
        author: collection.users?.name || collection.users?.username || "Unknown",
        year: new Date(collection.created_at).getFullYear().toString(),
        batch: "General",
        abstract: collection.description || "",
        type: "PDF",
        size: "2.5 MB", // Mock size
        downloadUrl: `/collections/${collection.id}`,
        content: collection.content
      }));

      // Map limited collections with this category
      const limitedFiles = limitedCollections
        .filter((lc: any) => lc.category === category.id)
        .map((lc: any) => ({
          id: lc.id,
          title: lc.title,
          author: lc.users?.name || lc.users?.username || "Unknown",
          year: new Date(lc.created_at).getFullYear().toString(),
          batch: `Limited (${lc.current_access}/${lc.max_access})`,
          abstract: lc.description || "",
          type: "PDF",
          size: "3.2 MB", // Mock size
          downloadUrl: `/limited-collections/${lc.id}`,
          content: lc.content,
          isLimited: true,
          maxAccess: lc.max_access,
          currentAccess: lc.current_access
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
    return { error: 'Gagal mengambil koleksi berdasarkan kategori' };
  }
}

export async function getAvailableYears() {
  try {
    // Get all public collections
    const collections = await prisma.collections.findMany({
      where: {
        is_public: true
      },
      select: {
        created_at: true
      }
    });

    // Get all limited collections
    const limitedCollections = await prisma.limited_collections.findMany({
      where: {
        is_active: true
      },
      select: {
        created_at: true
      }
    });

    // Extract years from collections
    const collectionYears = collections.map((c: any) => new Date(c.created_at).getFullYear());
    const limitedCollectionYears = limitedCollections.map((c: any) => new Date(c.created_at).getFullYear());

    // Combine and remove duplicates
    const allYears = [...collectionYears, ...limitedCollectionYears];
    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a); // Sort descending (newest first)

    return {
      success: true,
      years: uniqueYears
    };
  } catch (error) {
    console.error('Get available years error:', error);
    return { error: 'Gagal mengambil tahun yang tersedia' };
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
    const collections = await prisma.collections.findMany({
      where: {
        is_public: true,
        created_at: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Get all limited collections for the target year
    const limitedCollections = await prisma.limited_collections.findMany({
      where: {
        is_active: true,
        created_at: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
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
        (collection: any) => collection.category === category.id
      );

      // Map the collections to the expected format
      const files = categoryCollections.map((collection: any) => ({
        id: collection.id,
        title: collection.title,
        author: collection.users?.name || collection.users?.username || "Unknown",
        year: new Date(collection.created_at).getFullYear().toString(),
        batch: "General",
        abstract: collection.description || "",
        type: "PDF",
        size: "2.5 MB", // Mock size
        downloadUrl: `/collections/${collection.id}`,
        content: collection.content
      }));

      // Map limited collections with this category
      const limitedFiles = limitedCollections
        .filter((lc: any) => lc.category === category.id)
        .map((lc: any) => ({
          id: lc.id,
          title: lc.title,
          author: lc.users?.name || lc.users?.username || "Unknown",
          year: new Date(lc.created_at).getFullYear().toString(),
          batch: `Limited (${lc.current_access}/${lc.max_access})`,
          abstract: lc.description || "",
          type: "PDF",
          size: "3.2 MB", // Mock size
          downloadUrl: `/limited-collections/${lc.id}`,
          content: lc.content,
          isLimited: true,
          maxAccess: lc.max_access,
          currentAccess: lc.current_access
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
    return { error: 'Gagal mengambil koleksi berdasarkan tahun' };
  }
} 
