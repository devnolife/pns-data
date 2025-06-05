'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'

// Types for collections and reports
export interface CollectionData {
  id: string
  title: string
  description: string | null
  content: string
  image_url: string | null
  category: string | null
  tags: string | null
  is_public: boolean
  author_id: string
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    username: string
  }
}

export interface ReportData {
  id: string
  title: string
  description: string | null
  content: string
  status: string
  category: string | null
  priority: string
  author_id: string
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    username: string
    training?: string | null
    angkatan?: string | null
  }
}

export interface AngkatanData {
  id: string
  angkatan: string
  reports: ReportData[]
  totalReports: number
}

export interface YearData {
  id: string
  year: string
  angkatan: AngkatanData[]
  totalReports: number
}

export interface CategoryData {
  id: string
  name: string
  description: string
  years: YearData[]
  totalReports: number
}

// Get user's collections organized by category
export async function getUserCollectionsByCategoryAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Define default categories
    const defaultCategories = [
      { key: 'pkn', name: 'PKN (Pelatihan Kepemimpinan Nasional)', description: 'Koleksi materi pelatihan kepemimpinan tingkat nasional yang lit! 🔥' },
      { key: 'pka', name: 'PKA (Administrator)', description: 'Koleksi materi pelatihan untuk jabatan administrator yang epic! 🚀' },
      { key: 'pkp', name: 'PKP (Pengawas)', description: 'Koleksi materi pelatihan untuk jabatan pengawas yang keren abis! ✨' },
      { key: 'latsar', name: 'Latsar CPNS', description: 'Koleksi materi Pelatihan Dasar CPNS yang absolutely amazing! 💫' }
    ]

    // Get all collections for the current user
    const collections = await prisma.collections.findMany({
      where: {
        author_id: currentUser.id
      },
      include: {
        users: {
          select: {
            name: true,
            username: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    // Group collections by category
    const categorizedCollections = collections.reduce((acc, collection) => {
      // Normalize category name to match default categories
      let categoryKey = 'other'
      const categoryLower = (collection.category || '').toLowerCase()

      if (categoryLower.includes('pkn') || categoryLower.includes('kepemimpinan nasional')) {
        categoryKey = 'pkn'
      } else if (categoryLower.includes('pka') || categoryLower.includes('administrator')) {
        categoryKey = 'pka'
      } else if (categoryLower.includes('pkp') || categoryLower.includes('pengawas')) {
        categoryKey = 'pkp'
      } else if (categoryLower.includes('latsar') || categoryLower.includes('cpns')) {
        categoryKey = 'latsar'
      }

      if (!acc[categoryKey]) {
        acc[categoryKey] = []
      }
      acc[categoryKey].push({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        content: collection.content,
        image_url: collection.image_url,
        category: collection.category,
        tags: collection.tags,
        is_public: collection.is_public,
        author_id: collection.author_id,
        created_at: collection.created_at,
        updated_at: collection.updated_at,
        author: collection.users
      })
      return acc
    }, {} as Record<string, CollectionData[]>)

    // Create categories array with default categories always present
    const categories = defaultCategories.map(defaultCat => ({
      id: defaultCat.key,
      name: defaultCat.name,
      description: defaultCat.description,
      collections: categorizedCollections[defaultCat.key] || [],
      totalCollections: (categorizedCollections[defaultCat.key] || []).length
    }))

    // Add "Other" category if there are collections that don't match default categories
    if (categorizedCollections.other && categorizedCollections.other.length > 0) {
      categories.push({
        id: 'other',
        name: 'Lainnya',
        description: 'Koleksi dalam kategori lainnya',
        collections: categorizedCollections.other,
        totalCollections: categorizedCollections.other.length
      })
    }

    return {
      success: true,
      data: {
        categories,
        totalCollections: collections.length
      }
    }
  } catch (error) {
    console.error('Get user collections by category error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil koleksi'
    }
  }
}

// Get user's reports organized by category → year → angkatan
export async function getUserReportsByCategoryAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Define default categories
    const defaultCategories = [
      { key: 'pkn', name: 'PKN (Pelatihan Kepemimpinan Nasional)', description: 'Laporan pelatihan kepemimpinan tingkat nasional yang lit! 🔥' },
      { key: 'pka', name: 'PKA (Administrator)', description: 'Laporan pelatihan untuk jabatan administrator yang epic! 🚀' },
      { key: 'pkp', name: 'PKP (Pengawas)', description: 'Laporan pelatihan untuk jabatan pengawas yang keren abis! ✨' },
      { key: 'latsar', name: 'Latsar CPNS', description: 'Laporan Pelatihan Dasar CPNS yang absolutely amazing! 💫' }
    ]

    // Get all reports for the current user with author details
    const reports = await prisma.reports.findMany({
      where: {
        author_id: currentUser.id
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    // Group reports by category → year → angkatan
    const categorizedReports = reports.reduce((acc, report) => {
      // Normalize category name to match default categories
      let categoryKey = 'other'
      const categoryLower = (report.category || '').toLowerCase()

      if (categoryLower.includes('pkn') || categoryLower.includes('kepemimpinan nasional')) {
        categoryKey = 'pkn'
      } else if (categoryLower.includes('pka') || categoryLower.includes('administrator')) {
        categoryKey = 'pka'
      } else if (categoryLower.includes('pkp') || categoryLower.includes('pengawas')) {
        categoryKey = 'pkp'
      } else if (categoryLower.includes('latsar') || categoryLower.includes('cpns')) {
        categoryKey = 'latsar'
      }

      const year = new Date(report.created_at).getFullYear().toString()
      const angkatan = report.users_reports_author_idTousers?.angkatan || 'I'

      if (!acc[categoryKey]) {
        acc[categoryKey] = {}
      }
      if (!acc[categoryKey][year]) {
        acc[categoryKey][year] = {}
      }
      if (!acc[categoryKey][year][angkatan]) {
        acc[categoryKey][year][angkatan] = []
      }

      acc[categoryKey][year][angkatan].push({
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers
      })
      return acc
    }, {} as Record<string, Record<string, Record<string, ReportData[]>>>)

    // Create categories array with default categories always present
    const categories = defaultCategories.map(defaultCat => {
      const categoryReports = categorizedReports[defaultCat.key] || {}

      const years = Object.keys(categoryReports).map(year => {
        const yearReports = categoryReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `${defaultCat.key}-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan)) // Sort angkatan alphabetically

        return {
          id: `${defaultCat.key}-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year)) // Sort years descending

      return {
        id: defaultCat.key,
        name: defaultCat.name,
        description: defaultCat.description,
        years: years,
        totalReports: Object.values(categoryReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      }
    })

    // Add "Other" category if there are reports that don't match default categories
    if (categorizedReports.other && Object.keys(categorizedReports.other).length > 0) {
      const otherReports = categorizedReports.other
      const otherYears = Object.keys(otherReports).map(year => {
        const yearReports = otherReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `other-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan))

        return {
          id: `other-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year))

      categories.push({
        id: 'other',
        name: 'Lainnya',
        description: 'Laporan dalam kategori lainnya',
        years: otherYears,
        totalReports: Object.values(otherReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      })
    }

    return {
      success: true,
      data: {
        categories,
        totalReports: reports.length
      }
    }
  } catch (error) {
    console.error('Get user reports by category error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan'
    }
  }
}

// Get reports by category, year, and angkatan
export async function getReportsByAngkatanAction(category: string, year: string, angkatan: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Build category filter
    let categoryFilter: any = {}
    const categoryLower = category.toLowerCase()

    if (categoryLower === 'pkn') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKN', mode: 'insensitive' } },
          { category: { contains: 'kepemimpinan nasional', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pka') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKA', mode: 'insensitive' } },
          { category: { contains: 'administrator', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pkp') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKP', mode: 'insensitive' } },
          { category: { contains: 'pengawas', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'latsar') {
      categoryFilter = {
        OR: [
          { category: { contains: 'LATSAR', mode: 'insensitive' } },
          { category: { contains: 'CPNS', mode: 'insensitive' } }
        ]
      }
    }

    // Date range for the year
    const startDate = new Date(parseInt(year), 0, 1)
    const endDate = new Date(parseInt(year), 11, 31, 23, 59, 59, 999)

    const reports = await prisma.reports.findMany({
      where: {
        author_id: currentUser.id,
        ...categoryFilter,
        created_at: {
          gte: startDate,
          lte: endDate
        },
        users_reports_author_idTousers: {
          angkatan: angkatan
        }
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    const formattedReports = reports.map(report => ({
      id: report.id,
      title: report.title,
      description: report.description,
      content: report.content,
      status: report.status,
      category: report.category,
      priority: report.priority,
      author_id: report.author_id,
      created_at: report.created_at,
      updated_at: report.updated_at,
      author: report.users_reports_author_idTousers
    }))

    return {
      success: true,
      data: {
        reports: formattedReports,
        category,
        year,
        angkatan,
        totalReports: formattedReports.length
      }
    }
  } catch (error) {
    console.error('Get reports by angkatan error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan'
    }
  }
}

// Get specific collection by ID
export async function getCollectionByIdAction(collectionId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const collection = await prisma.collections.findFirst({
      where: {
        id: collectionId,
        author_id: currentUser.id
      },
      include: {
        users: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    if (!collection) {
      return {
        success: false,
        error: 'Koleksi tidak ditemukan'
      }
    }

    return {
      success: true,
      data: {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        content: collection.content,
        image_url: collection.image_url,
        category: collection.category,
        tags: collection.tags,
        is_public: collection.is_public,
        author_id: collection.author_id,
        created_at: collection.created_at,
        updated_at: collection.updated_at,
        author: collection.users
      }
    }
  } catch (error) {
    console.error('Get collection by ID error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil koleksi'
    }
  }
}

// Get specific report by ID
export async function getReportByIdAction(reportId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const report = await prisma.reports.findFirst({
      where: {
        id: reportId,
        author_id: currentUser.id
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        }
      }
    })

    if (!report) {
      return {
        success: false,
        error: 'Laporan tidak ditemukan'
      }
    }

    return {
      success: true,
      data: {
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers
      }
    }
  } catch (error) {
    console.error('Get report by ID error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan'
    }
  }
}

// Search collections and reports
export async function searchUserDocumentsAction(query: string, type?: 'collections' | 'reports' | 'all') {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    if (!query || query.trim().length < 2) {
      return {
        success: false,
        error: 'Query pencarian minimal 2 karakter'
      }
    }

    const searchType = type || 'all'
    const results: { collections: CollectionData[], reports: ReportData[] } = {
      collections: [],
      reports: []
    }

    if (searchType === 'collections' || searchType === 'all') {
      const collections = await prisma.collections.findMany({
        where: {
          author_id: currentUser.id,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
            { tags: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          users: {
            select: {
              name: true,
              username: true
            }
          }
        },
        orderBy: { updated_at: 'desc' },
        take: 20
      })

      results.collections = collections.map(collection => ({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        content: collection.content,
        image_url: collection.image_url,
        category: collection.category,
        tags: collection.tags,
        is_public: collection.is_public,
        author_id: collection.author_id,
        created_at: collection.created_at,
        updated_at: collection.updated_at,
        author: collection.users
      }))
    }

    if (searchType === 'reports' || searchType === 'all') {
      const reports = await prisma.reports.findMany({
        where: {
          author_id: currentUser.id,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          users_reports_author_idTousers: {
            select: {
              name: true,
              username: true,
              training: true,
              angkatan: true
            }
          }
        },
        orderBy: { updated_at: 'desc' },
        take: 20
      })

      results.reports = reports.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers
      }))
    }

    return {
      success: true,
      data: results
    }
  } catch (error) {
    console.error('Search user documents error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mencari dokumen'
    }
  }
}

// PERBAIKAN: Fungsi untuk mengambil SEMUA laporan COMPLETED (publik) berdasarkan kategori
// Tidak dibatasi oleh author_id, semua user bisa melihat laporan yang sudah diverifikasi
export async function getAllCompletedReportsByCategoryAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Define default categories
    const defaultCategories = [
      { key: 'pkn', name: 'PKN (Pelatihan Kepemimpinan Nasional)', description: 'Laporan pelatihan kepemimpinan tingkat nasional yang sudah diverifikasi! 🔥' },
      { key: 'pka', name: 'PKA (Administrator)', description: 'Laporan pelatihan untuk jabatan administrator yang sudah diverifikasi! 🚀' },
      { key: 'pkp', name: 'PKP (Pengawas)', description: 'Laporan pelatihan untuk jabatan pengawas yang sudah diverifikasi! ✨' },
      { key: 'latsar', name: 'Latsar CPNS', description: 'Laporan Pelatihan Dasar CPNS yang sudah diverifikasi! 💫' }
    ]

    // PERBAIKAN: Ambil SEMUA laporan dengan status COMPLETED dari SEMUA user
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED' // Hanya laporan yang sudah diverifikasi/completed
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        cover_image_url: true, // Include cover image URL
        status: true,
        category: true,
        priority: true,
        author_id: true,
        created_at: true,
        updated_at: true,
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            file_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    console.log(`📊 Found ${reports.length} completed reports from all users for digital collection`)

    // Group reports by category → year → angkatan berdasarkan data FILE (bukan user profile)
    const categorizedReports = reports.reduce((acc, report) => {
      // Normalize category name to match default categories
      let categoryKey = 'other'
      const categoryLower = (report.category || '').toLowerCase()

      if (categoryLower.includes('pkn') || categoryLower.includes('kepemimpinan nasional')) {
        categoryKey = 'pkn'
      } else if (categoryLower.includes('pka') || categoryLower.includes('administrator')) {
        categoryKey = 'pka'
      } else if (categoryLower.includes('pkp') || categoryLower.includes('pengawas')) {
        categoryKey = 'pkp'
      } else if (categoryLower.includes('latsar') || categoryLower.includes('cpns')) {
        categoryKey = 'latsar'
      }

      // PERBAIKAN: Gunakan data dari file untuk tahun dan angkatan, bukan dari user profile
      const firstFile = report.files[0]
      const year = firstFile?.year || new Date(report.created_at).getFullYear().toString()
      const angkatan = firstFile?.batch || report.users_reports_author_idTousers?.angkatan || 'I'

      if (!acc[categoryKey]) {
        acc[categoryKey] = {}
      }
      if (!acc[categoryKey][year]) {
        acc[categoryKey][year] = {}
      }
      if (!acc[categoryKey][year][angkatan]) {
        acc[categoryKey][year][angkatan] = []
      }

      acc[categoryKey][year][angkatan].push({
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        cover_image_url: report.cover_image_url, // Include cover image URL
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers,
        files: report.files,
        isPublicReport: true // Flag untuk menandai ini laporan publik
      })
      return acc
    }, {} as Record<string, Record<string, Record<string, (ReportData & { files?: any[], isPublicReport?: boolean })[]>>>)

    // Create categories array with default categories always present
    const categories = defaultCategories.map(defaultCat => {
      const categoryReports = categorizedReports[defaultCat.key] || {}

      const years = Object.keys(categoryReports).map(year => {
        const yearReports = categoryReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `${defaultCat.key}-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan)) // Sort angkatan alphabetically

        return {
          id: `${defaultCat.key}-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year)) // Sort years descending

      return {
        id: defaultCat.key,
        name: defaultCat.name,
        description: defaultCat.description,
        years: years,
        totalReports: Object.values(categoryReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      }
    })

    // Add "Other" category if there are reports that don't match default categories
    if (categorizedReports.other && Object.keys(categorizedReports.other).length > 0) {
      const otherReports = categorizedReports.other
      const otherYears = Object.keys(otherReports).map(year => {
        const yearReports = otherReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `other-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan))

        return {
          id: `other-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year))

      categories.push({
        id: 'other',
        name: 'Lainnya',
        description: 'Laporan dalam kategori lainnya yang sudah diverifikasi',
        years: otherYears,
        totalReports: Object.values(otherReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      })
    }

    return {
      success: true,
      data: {
        categories,
        totalReports: reports.length,
        isPublicView: true // Flag untuk menandai ini adalah view publik
      }
    }
  } catch (error) {
    console.error('Get all completed reports by category error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan publik'
    }
  }
}

// PERBAIKAN: Fungsi untuk mengambil laporan publik berdasarkan kategori, tahun, dan angkatan
export async function getAllCompletedReportsByAngkatanAction(category: string, year: string, angkatan: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Build category filter
    let categoryFilter: any = {}
    const categoryLower = category.toLowerCase()

    if (categoryLower === 'pkn') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKN', mode: 'insensitive' } },
          { category: { contains: 'kepemimpinan nasional', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pka') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKA', mode: 'insensitive' } },
          { category: { contains: 'administrator', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pkp') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKP', mode: 'insensitive' } },
          { category: { contains: 'pengawas', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'latsar') {
      categoryFilter = {
        OR: [
          { category: { contains: 'LATSAR', mode: 'insensitive' } },
          { category: { contains: 'CPNS', mode: 'insensitive' } }
        ]
      }
    }

    // PERBAIKAN: Ambil laporan berdasarkan data file, bukan profile user
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED', // Hanya laporan yang sudah diverifikasi
        ...categoryFilter,
        files: {
          some: {
            year: year,
            batch: angkatan
          }
        }
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    console.log(`📊 Found ${reports.length} completed reports for ${category}/${year}/${angkatan}`)

    const formattedReports = reports.map(report => ({
      id: report.id,
      title: report.title,
      description: report.description,
      content: report.content,
      status: report.status,
      category: report.category,
      priority: report.priority,
      author_id: report.author_id,
      created_at: report.created_at,
      updated_at: report.updated_at,
      author: report.users_reports_author_idTousers,
      files: report.files,
      isPublicReport: true
    }))

    return {
      success: true,
      data: {
        reports: formattedReports,
        category,
        year,
        angkatan,
        totalReports: formattedReports.length,
        isPublicView: true
      }
    }
  } catch (error) {
    console.error('Get completed reports by angkatan error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan publik'
    }
  }
}

// PERBAIKAN: Fungsi pencarian untuk laporan publik yang sudah COMPLETED
export async function searchPublicDocumentsAction(query: string, type: 'collections' | 'reports' | 'all' = 'all') {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    if (!query.trim()) {
      return {
        success: false,
        error: 'Query pencarian tidak boleh kosong'
      }
    }

    const searchTerm = query.trim().toLowerCase()

    // Search collections (tetap sama, hanya milik user)
    let collections: CollectionData[] = []
    if (type === 'collections' || type === 'all') {
      const collectionsResult = await prisma.collections.findMany({
        where: {
          author_id: currentUser.id,
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } },
            { tags: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        include: {
          users: {
            select: {
              name: true,
              username: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        take: 20
      })

      collections = collectionsResult.map(collection => ({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        content: collection.content,
        image_url: collection.image_url,
        category: collection.category,
        tags: collection.tags,
        is_public: collection.is_public,
        author_id: collection.author_id,
        created_at: collection.created_at,
        updated_at: collection.updated_at,
        author: collection.users
      }))
    }

    // PERBAIKAN: Search reports - SEMUA laporan COMPLETED, bukan hanya milik user
    let reports: ReportData[] = []
    if (type === 'reports' || type === 'all') {
      const reportsResult = await prisma.reports.findMany({
        where: {
          status: 'COMPLETED', // Hanya laporan yang sudah diverifikasi
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        include: {
          users_reports_author_idTousers: {
            select: {
              name: true,
              username: true,
              training: true,
              angkatan: true
            }
          },
          files: {
            select: {
              id: true,
              filename: true,
              original_name: true,
              file_size: true,
              mime_type: true,
              category: true,
              year: true,
              batch: true,
              created_at: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        take: 20
      })

      reports = reportsResult.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers,
        files: report.files,
        isPublicReport: true
      }))
    }

    console.log(`🔍 Search "${query}": Found ${reports.length} public reports and ${collections.length} collections`)

    return {
      success: true,
      data: {
        collections,
        reports,
        query: searchTerm,
        isPublicSearch: true
      }
    }
  } catch (error) {
    console.error('Search public documents error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mencari dokumen'
    }
  }
}

// FUNGSI MONITORING: Untuk memantau perbedaan antara laporan pribadi vs publik
export async function getReportsComparisonAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Ambil laporan milik user sendiri
    const userReports = await prisma.reports.findMany({
      where: {
        author_id: currentUser.id
      }
    })

    // Ambil semua laporan COMPLETED (publik)
    const publicReports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      }
    })

    // Laporan COMPLETED milik user
    const userCompletedReports = userReports.filter(r => r.status === 'COMPLETED')

    const comparison = {
      userTotalReports: userReports.length,
      userCompletedReports: userCompletedReports.length,
      allPublicReports: publicReports.length,
      publicReportsFromOthers: publicReports.filter(r => r.author_id !== currentUser.id).length,
      benefitMultiplier: Math.round(publicReports.length / Math.max(userCompletedReports.length, 1) * 100) / 100
    }

    console.log(`📊 Reports Comparison for user ${currentUser.username}:`, comparison)

    return {
      success: true,
      data: comparison,
      message: `User dapat melihat ${comparison.allPublicReports} laporan publik (vs ${comparison.userCompletedReports} laporan pribadi yang completed)`
    }
  } catch (error) {
    console.error('Get reports comparison error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal membandingkan laporan'
    }
  }
}
