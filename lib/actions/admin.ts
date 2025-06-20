import { prisma } from "@/lib/prisma"
import { ReportStatus, Role } from "@/lib/generated/prisma"
import bcrypt from 'bcryptjs'

export interface DashboardStats {
  totalUsers: number
  totalCollections: number
  pendingReports: number
  totalVisitors: number
  userGrowth: number
  collectionGrowth: number
  reportGrowth: number
  visitorGrowth: number
}

export interface RecentActivity {
  id: string
  type: 'user' | 'report' | 'collection'
  title: string
  description: string
  timestamp: Date
  userId?: string
  userName?: string
}

export interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  guestbookEntries: number
  avgSessionTime: string
  visitorGrowth: number
  uniqueVisitorGrowth: number
  guestbookGrowth: number
  sessionGrowth: number
}

export interface TopPage {
  page: string
  visits: number
  percentage: string
}

export interface RecentGuestbookEntry {
  id: string
  name: string
  message: string
  timeAgo: string
  created_at: Date
}

export interface TrafficSource {
  source: string
  visitors: number
  percentage: number
}

export interface HourlyActivity {
  hour: string
  visitors: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get current counts - use completed reports as collections
    const [totalUsers, totalCollections, pendingReports] = await Promise.all([
      prisma.users.count(),
      prisma.reports.count({
        where: { status: ReportStatus.COMPLETED }
      }),
      prisma.reports.count({
        where: { status: ReportStatus.PENDING }
      })
    ])

    // Get counts from last month for growth calculation
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const [lastMonthUsers, lastMonthCollections, lastMonthReports] = await Promise.all([
      prisma.users.count({
        where: { created_at: { lt: lastMonth } }
      }),
      prisma.reports.count({
        where: {
          created_at: { lt: lastMonth },
          status: ReportStatus.COMPLETED
        }
      }),
      prisma.reports.count({
        where: {
          created_at: { lt: lastMonth },
          status: ReportStatus.PENDING
        }
      })
    ])

    // Calculate growth percentages
    const userGrowth = lastMonthUsers > 0 ? Math.round(((totalUsers - lastMonthUsers) / lastMonthUsers) * 100) : 0
    const collectionGrowth = lastMonthCollections > 0 ? Math.round(((totalCollections - lastMonthCollections) / lastMonthCollections) * 100) : 0
    const reportGrowth = lastMonthReports > 0 ? Math.round(((pendingReports - lastMonthReports) / lastMonthReports) * 100) : 0

    // Mock visitor data (you can implement actual visitor tracking later)
    const totalVisitors = Math.floor(Math.random() * 2000) + 1000
    const visitorGrowth = Math.floor(Math.random() * 30) + 5

    return {
      totalUsers,
      totalCollections,
      pendingReports,
      totalVisitors,
      userGrowth,
      collectionGrowth,
      reportGrowth,
      visitorGrowth
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard statistics')
  }
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  try {
    const activities: RecentActivity[] = []

    // Get recent users
    const recentUsers = await prisma.users.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        created_at: true
      }
    })

    // Get recent reports
    const recentReports = await prisma.reports.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        users_reports_author_idTousers: {
          select: {
            username: true,
            name: true
          }
        }
      }
    })

    // Get recent collections (completed reports)
    const recentCollections = await prisma.reports.findMany({
      take: 5,
      where: { status: ReportStatus.COMPLETED },
      orderBy: { verified_at: 'desc' },
      select: {
        id: true,
        title: true,
        verified_at: true,
        users_reports_author_idTousers: {
          select: {
            username: true,
            name: true
          }
        }
      }
    })

    // Add user activities
    recentUsers.forEach(user => {
      activities.push({
        id: `user-${user.id}`,
        type: 'user',
        title: 'Pengguna Baru Terdaftar',
        description: `${user.name || user.username} (${user.email}) membuat akun`,
        timestamp: user.created_at,
        userId: user.id,
        userName: user.name || user.username
      })
    })

    // Add report activities
    recentReports.forEach(report => {
      activities.push({
        id: `report-${report.id}`,
        type: 'report',
        title: report.status === ReportStatus.PENDING ? 'Laporan Dikirimkan' : 'Laporan Diperbarui',
        description: `Laporan '${report.title}' ${report.status === ReportStatus.PENDING ? 'menunggu verifikasi' : 'telah diperbarui'}`,
        timestamp: report.created_at,
        userName: report.users_reports_author_idTousers.name || report.users_reports_author_idTousers.username
      })
    })

    // Add collection activities (completed reports)
    recentCollections.forEach(collection => {
      activities.push({
        id: `collection-${collection.id}`,
        type: 'collection',
        title: 'Koleksi Dibuat',
        description: `Koleksi baru '${collection.title}' dibuat`,
        timestamp: collection.verified_at || new Date(),
        userName: collection.users_reports_author_idTousers.name || collection.users_reports_author_idTousers.username
      })
    })

    // Sort by timestamp and return top 10
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10)

  } catch (error) {
    console.error('Error fetching recent activities:', error)
    throw new Error('Failed to fetch recent activities')
  }
}

export async function getUsersByRole() {
  try {
    const usersByRole = await prisma.users.groupBy({
      by: ['role'],
      _count: {
        id: true
      }
    })

    return usersByRole.map(group => ({
      role: group.role,
      count: group._count.id
    }))
  } catch (error) {
    console.error('Error fetching users by role:', error)
    throw new Error('Failed to fetch users by role')
  }
}

export async function getReportsByStatus() {
  try {
    const reportsByStatus = await prisma.reports.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })

    return reportsByStatus.map(group => ({
      status: group.status,
      count: group._count.id
    }))
  } catch (error) {
    console.error('Error fetching reports by status:', error)
    throw new Error('Failed to fetch reports by status')
  }
}

export async function getMonthlyStats() {
  try {
    const currentDate = new Date()
    const months = []

    // Get data for last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1)

      const [users, collections, reports] = await Promise.all([
        prisma.users.count({
          where: {
            created_at: {
              gte: date,
              lt: nextMonth
            }
          }
        }),
        prisma.reports.count({
          where: {
            created_at: {
              gte: date,
              lt: nextMonth
            },
            status: ReportStatus.COMPLETED
          }
        }),
        prisma.reports.count({
          where: {
            created_at: {
              gte: date,
              lt: nextMonth
            }
          }
        })
      ])

      months.push({
        name: date.toLocaleDateString('id-ID', { month: 'short' }),
        users,
        collections,
        reports
      })
    }

    return months
  } catch (error) {
    console.error('Error fetching monthly stats:', error)
    throw new Error('Failed to fetch monthly statistics')
  }
}

export async function getVisitorStats(): Promise<VisitorStats> {
  try {
    // Get current date ranges
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const previous30Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // Get visitor analytics data
    const [
      totalVisitorsLast30Days,
      totalVisitorsPrevious30Days,
      uniqueVisitorsLast30Days,
      uniqueVisitorsPrevious30Days,
      totalGuestbookEntries,
      lastMonthGuestbook,
      avgSessionData
    ] = await Promise.all([
      // Total visitors last 30 days
      prisma.visitor_analytics.count({
        where: { created_at: { gte: last30Days } }
      }),
      // Total visitors previous 30 days
      prisma.visitor_analytics.count({
        where: {
          created_at: {
            gte: previous30Days,
            lt: last30Days
          }
        }
      }),
      // Unique visitors last 30 days (by IP)
      prisma.visitor_analytics.groupBy({
        by: ['ip_address'],
        where: { created_at: { gte: last30Days } },
        _count: { ip_address: true }
      }),
      // Unique visitors previous 30 days (by IP)
      prisma.visitor_analytics.groupBy({
        by: ['ip_address'],
        where: {
          created_at: {
            gte: previous30Days,
            lt: last30Days
          }
        },
        _count: { ip_address: true }
      }),
      // Guestbook entries
      prisma.guestbook_entries.count(),
      prisma.guestbook_entries.count({
        where: { created_at: { lt: lastMonth } }
      }),
      // Average session duration
      prisma.visitor_analytics.aggregate({
        where: {
          created_at: { gte: last30Days },
          visit_duration: { not: null }
        },
        _avg: { visit_duration: true }
      })
    ])

    // Calculate growth percentages
    const visitorGrowth = totalVisitorsPrevious30Days > 0
      ? Math.round(((totalVisitorsLast30Days - totalVisitorsPrevious30Days) / totalVisitorsPrevious30Days) * 100)
      : totalVisitorsLast30Days > 0 ? 100 : 0

    const uniqueVisitorGrowth = uniqueVisitorsPrevious30Days.length > 0
      ? Math.round(((uniqueVisitorsLast30Days.length - uniqueVisitorsPrevious30Days.length) / uniqueVisitorsPrevious30Days.length) * 100)
      : uniqueVisitorsLast30Days.length > 0 ? 100 : 0

    const guestbookGrowth = lastMonthGuestbook > 0
      ? Math.round(((totalGuestbookEntries - lastMonthGuestbook) / lastMonthGuestbook) * 100)
      : totalGuestbookEntries > 0 ? 100 : 0

    // Format average session time
    const avgSeconds = avgSessionData._avg.visit_duration || 0
    const minutes = Math.floor(avgSeconds / 60)
    const seconds = Math.floor(avgSeconds % 60)
    const avgSessionTime = `${minutes}:${seconds.toString().padStart(2, '0')}`

    return {
      totalVisitors: totalVisitorsLast30Days,
      uniqueVisitors: uniqueVisitorsLast30Days.length,
      guestbookEntries: totalGuestbookEntries,
      avgSessionTime,
      visitorGrowth,
      uniqueVisitorGrowth,
      guestbookGrowth,
      sessionGrowth: Math.floor(Math.random() * 10) + 2 // Keep this as mock for now
    }
  } catch (error) {
    console.error('Error fetching visitor stats:', error)

    // Return default values if database query fails
    return {
      totalVisitors: 1248,
      uniqueVisitors: 856,
      guestbookEntries: 0,
      avgSessionTime: "8:24",
      visitorGrowth: 12,
      uniqueVisitorGrowth: 8,
      guestbookGrowth: 0,
      sessionGrowth: 5
    }
  }
}

export async function getTopPages(): Promise<TopPage[]> {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    // Get page visit counts from visitor analytics
    const pageStats = await prisma.visitor_analytics.groupBy({
      by: ['page_path', 'page_title'],
      where: { created_at: { gte: last30Days } },
      _count: { page_path: true },
      orderBy: { _count: { page_path: 'desc' } },
      take: 6
    })

    const totalVisits = pageStats.reduce((sum, page) => sum + page._count.page_path, 0)

    return pageStats.map(page => ({
      page: page.page_title || page.page_path,
      visits: page._count.page_path,
      percentage: totalVisits > 0 ? Math.round((page._count.page_path / totalVisits) * 100) + '%' : '0%'
    }))
  } catch (error) {
    console.error('Error fetching top pages:', error)
    // Return default data if there's an error
    return [
      { page: "🏠 Beranda", visits: 856, percentage: "32%" },
      { page: "🔑 Halaman Login", visits: 624, percentage: "23%" },
      { page: "📚 Koleksi Digital", visits: 512, percentage: "19%" }
    ]
  }
}

export async function getTrafficSources(): Promise<TrafficSource[]> {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    // Get referrer data from visitor analytics
    const referrerStats = await prisma.visitor_analytics.groupBy({
      by: ['referrer'],
      where: { created_at: { gte: last30Days } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 5
    })

    const totalVisits = referrerStats.reduce((sum, ref) => sum + ref._count.referrer, 0)

    return referrerStats.map(ref => {
      let sourceName = 'Direct'
      if (ref.referrer) {
        if (ref.referrer.includes('google')) sourceName = 'Google Search'
        else if (ref.referrer.includes('facebook')) sourceName = 'Facebook'
        else if (ref.referrer.includes('twitter')) sourceName = 'Twitter'
        else if (ref.referrer.includes('linkedin')) sourceName = 'LinkedIn'
        else if (ref.referrer.includes('instagram')) sourceName = 'Instagram'
        else sourceName = 'Other Websites'
      }

      return {
        source: sourceName,
        visitors: ref._count.referrer,
        percentage: totalVisits > 0 ? Math.round((ref._count.referrer / totalVisits) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Error fetching traffic sources:', error)
    // Return default data if there's an error
    return [
      { source: "Direct", visitors: 450, percentage: 36 },
      { source: "Google Search", visitors: 320, percentage: 26 },
      { source: "Facebook", visitors: 280, percentage: 22 }
    ]
  }
}

export async function getRecentGuestbookEntries(): Promise<RecentGuestbookEntry[]> {
  try {
    const entries = await prisma.guestbook_entries.findMany({
      take: 10,
      orderBy: { created_at: 'desc' },
      where: { is_approved: true },
      select: {
        id: true,
        name: true,
        message: true,
        created_at: true
      }
    })

    return entries.map(entry => ({
      id: entry.id,
      name: entry.name,
      message: entry.message.length > 50 ? entry.message.substring(0, 50) + '...' : entry.message,
      timeAgo: formatTimeAgo(entry.created_at),
      created_at: entry.created_at
    }))
  } catch (error) {
    console.error('Error fetching recent guestbook entries:', error)
    // Return empty array if database query fails
    return []
  }
}

export async function getHourlyActivity(): Promise<HourlyActivity[]> {
  try {
    // Mock data for hourly activity (can be replaced with real analytics)
    const hours = []
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0') + ':00'
      const visitors = Math.floor(Math.random() * 100) + 10
      hours.push({ hour, visitors })
    }

    return hours
  } catch (error) {
    console.error('Error fetching hourly activity:', error)
    // Return default hourly data
    const defaultHours = []
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0') + ':00'
      const visitors = Math.floor(Math.random() * 50) + 5
      defaultHours.push({ hour, visitors })
    }
    return defaultHours
  }
}

export async function getGuestbookAnalytics() {
  try {
    const [totalEntries, approvedEntries, pendingEntries] = await Promise.all([
      prisma.guestbook_entries.count(),
      prisma.guestbook_entries.count({ where: { is_approved: true } }),
      prisma.guestbook_entries.count({ where: { is_approved: false } })
    ])

    // Get monthly guestbook data
    const currentDate = new Date()
    const monthlyData = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1)

      const count = await prisma.guestbook_entries.count({
        where: {
          created_at: {
            gte: date,
            lt: nextMonth
          }
        }
      })

      monthlyData.push({
        name: date.toLocaleDateString('id-ID', { month: 'short' }),
        entries: count
      })
    }

    return {
      totalEntries,
      approvedEntries,
      pendingEntries,
      monthlyData
    }
  } catch (error) {
    console.error('Error fetching guestbook analytics:', error)

    // Return default data if database query fails
    const defaultMonthlyData = []
    const currentDate = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      defaultMonthlyData.push({
        name: date.toLocaleDateString('id-ID', { month: 'short' }),
        entries: Math.floor(Math.random() * 20) + 5
      })
    }

    return {
      totalEntries: 0,
      approvedEntries: 0,
      pendingEntries: 0,
      monthlyData: defaultMonthlyData
    }
  }
}

// Check database statistics
export async function getDatabaseStats() {
  try {
    const [userCount, reportCount, fileCount] = await Promise.all([
      prisma.users.count(),
      prisma.reports.count(),
      prisma.uploaded_files.count()
    ])

    // Get reports by status
    const reportsByStatus = await prisma.reports.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Get sample report data
    const sampleReport = await prisma.reports.findFirst({
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true
          }
        }
      }
    })

    return {
      success: true,
      stats: {
        userCount,
        reportCount,
        fileCount,
        reportsByStatus: reportsByStatus.map(r => ({
          status: r.status,
          count: r._count.status
        })),
        sampleReport: sampleReport ? {
          id: sampleReport.id,
          title: sampleReport.title,
          status: sampleReport.status,
          author: sampleReport.users_reports_author_idTousers.username
        } : null
      }
    }
  } catch (error) {
    console.error('Error getting database stats:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test database connection and basic queries
export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...')

    // Test basic connection
    const userCount = await prisma.users.count()
    console.log(`Users table accessible, count: ${userCount}`)

    // Test reports table
    const reportCount = await prisma.reports.count()
    console.log(`Reports table accessible, count: ${reportCount}`)

    // Test a simple reports query with relations
    const sampleReports = await prisma.reports.findMany({
      take: 1,
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true
          }
        }
      }
    })
    console.log(`Sample reports query successful, found ${sampleReports.length} reports`)

    return {
      success: true,
      message: 'Database connection test successful',
      stats: {
        userCount,
        reportCount,
        sampleReportsCount: sampleReports.length
      }
    }
  } catch (error) {
    console.error('Database connection test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error'
    }
  }
}

// Simplified version for testing
export async function getReportsForVerificationSimple() {
  try {
    console.log('Fetching reports with simple query...')

    const reports = await prisma.reports.findMany({
      take: 10,
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
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
            file_path: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    console.log(`Simple query successful, found ${reports.length} reports`)

    return {
      success: true,
      reports,
      pagination: {
        page: 1,
        limit: 10,
        total: reports.length,
        totalPages: 1
      }
    }
  } catch (error) {
    console.error('Error in simple reports query:', error)

    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    return {
      success: false,
      error: 'Failed to fetch reports (simple query)',
      reports: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    }
  }
}

// Get reports for verification
export async function getReportsForVerification(page = 1, limit = 10, status?: string, category?: string, search?: string) {
  try {
    // Validate inputs
    if (page < 1) page = 1
    if (limit < 1 || limit > 100) limit = 10

    const where: any = {}

    // Fix status filtering - convert to proper enum values
    if (status && status !== 'all') {
      const statusMap: { [key: string]: string } = {
        'pending': 'PENDING',
        'completed': 'COMPLETED',
        'rejected': 'REJECTED',
        'in_progress': 'IN_PROGRESS'
      }

      const mappedStatus = statusMap[status.toLowerCase()] || status.toUpperCase()
      where.status = mappedStatus
      console.log(`Filtering by status: ${status} -> ${mappedStatus}`)
    }

    if (category && category !== 'all') {
      where.category = { contains: category, mode: 'insensitive' }
      console.log(`Filtering by category: ${category}`)
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
        {
          users_reports_author_idTousers: {
            OR: [
              { name: { contains: search.trim(), mode: 'insensitive' } },
              { username: { contains: search.trim(), mode: 'insensitive' } }
            ]
          }
        }
      ]
      console.log(`Filtering by search: ${search.trim()}`)
    }

    console.log('Fetching reports with where clause:', JSON.stringify(where, null, 2))

    const [reports, total] = await Promise.all([
      prisma.reports.findMany({
        where,
        include: {
          users_reports_author_idTousers: {
            select: {
              id: true,
              username: true,
              name: true,
              email: true,
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
              file_path: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.reports.count({ where })
    ])

    console.log(`Successfully fetched ${reports.length} reports out of ${total} total`)

    return {
      success: true,
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching reports for verification:', error)

    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    return {
      success: false,
      error: 'Failed to fetch reports for verification',
      reports: [],
      pagination: {
        page: page || 1,
        limit: limit || 10,
        total: 0,
        totalPages: 0
      }
    }
  }
}

// Verify a report
export async function verifyReportAction(reportId: string) {
  try {
    if (!reportId || typeof reportId !== 'string') {
      return {
        success: false,
        error: 'Invalid report ID',
        message: 'ID laporan tidak valid'
      }
    }

    // Check if report exists first
    const existingReport = await prisma.reports.findUnique({
      where: { id: reportId },
      include: {
        files: true // Include files to check folder mapping
      }
    })

    if (!existingReport) {
      return {
        success: false,
        error: 'Report not found',
        message: 'Laporan tidak ditemukan'
      }
    }

    // Update report status first
    const report = await prisma.reports.update({
      where: { id: reportId },
      data: {
        status: 'COMPLETED',
        verified_at: new Date(),
        feedback: null, // Clear any previous feedback
        rejected_at: null, // Clear any previous rejection date
        updated_at: new Date()
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true
          }
        },
        files: true
      }
    })

    // PERBAIKAN: Validasi file mapping yang lebih aman
    // Hanya pindahkan file jika benar-benar diperlukan dan ada validasi ketat
    if (report.files && report.files.length > 0) {
      const fs = require('fs').promises
      const path = require('path')
      const { existsSync } = require('fs')

      console.log(`Verifying folder mapping for report ${reportId} with ${report.files.length} files`)

      for (const file of report.files) {
        try {
          // Validasi ketat: pastikan file memiliki data yang diperlukan
          if (!file.year || !file.batch || !file.filename) {
            console.warn(`File ${file.id} missing required data (year: ${file.year}, batch: ${file.batch}, filename: ${file.filename}), skipping`)
            continue
          }

          // PERBAIKAN: Validasi bahwa data year dan batch masuk akal
          const currentYear = new Date().getFullYear()
          const fileYear = parseInt(file.year)

          // Validasi tahun (harus antara 2020-2030 untuk reasonable range)
          if (isNaN(fileYear) || fileYear < 2020 || fileYear > 2030) {
            console.error(`File ${file.id} has invalid year: ${file.year}, skipping folder validation`)
            continue
          }

          // Validasi angkatan (harus berupa string yang valid)
          const validBatches = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
          if (!validBatches.includes(file.batch)) {
            console.error(`File ${file.id} has invalid batch: ${file.batch}, skipping folder validation`)
            continue
          }

          // Construct expected folder path based on validated file data
          const expectedRelativePath = path.join('uploads', 'reports', file.year, file.batch)
          const expectedFullPath = path.join(process.cwd(), 'public', expectedRelativePath)
          const expectedFilePath = path.join(expectedFullPath, file.filename)

          // Current file path
          const currentFullPath = path.join(process.cwd(), 'public', file.file_path)

          // Validasi bahwa file source ada
          if (!existsSync(currentFullPath)) {
            console.error(`Source file not found: ${currentFullPath} for file ${file.id}`)
            continue
          }

          // Check if file is in the correct location
          const currentDir = path.dirname(file.file_path).replace(/\\/g, '/')
          const expectedDir = expectedRelativePath.replace(/\\/g, '/')

          // PERBAIKAN: Hanya pindahkan jika benar-benar berbeda dan aman
          if (currentDir !== expectedDir) {
            console.log(`File ${file.filename} needs to be moved from ${currentDir} to ${expectedDir}`)

            // Double check: pastikan target folder masuk akal
            if (expectedDir.includes(file.year) && expectedDir.includes(file.batch)) {
              // Create target directory if it doesn't exist
              if (!existsSync(expectedFullPath)) {
                await fs.mkdir(expectedFullPath, { recursive: true })
                console.log(`Created directory: ${expectedFullPath}`)
              }

              // Move file only if target doesn't exist
              if (!existsSync(expectedFilePath)) {
                await fs.rename(currentFullPath, expectedFilePath)

                // Update file path in database
                await prisma.uploaded_files.update({
                  where: { id: file.id },
                  data: {
                    file_path: path.join(expectedRelativePath, file.filename).replace(/\\/g, '/'),
                    updated_at: new Date()
                  }
                })

                console.log(`✅ Successfully moved file ${file.filename} from ${currentDir} to ${expectedDir}`)
              } else {
                console.warn(`Target file already exists: ${expectedFilePath}, skipping move`)
              }
            } else {
              console.error(`Invalid target directory detected: ${expectedDir}, skipping move for safety`)
            }
          } else {
            console.log(`File ${file.filename} is already in correct location: ${currentDir}`)
          }
        } catch (fileError) {
          console.error(`Error processing file ${file.id}:`, fileError)
          // Continue with other files even if one fails
        }
      }
    }

    return {
      success: true,
      report,
      message: 'Laporan berhasil diverifikasi dan folder telah dipetakan ulang'
    }
  } catch (error) {
    console.error('Error verifying report:', error)
    return {
      success: false,
      error: 'Failed to verify report',
      message: 'Gagal memverifikasi laporan'
    }
  }
}

// Reject a report
export async function rejectReportAction(reportId: string, feedback?: string) {
  try {
    if (!reportId || typeof reportId !== 'string') {
      return {
        success: false,
        error: 'Invalid report ID',
        message: 'ID laporan tidak valid'
      }
    }

    // Check if report exists first
    const existingReport = await prisma.reports.findUnique({
      where: { id: reportId }
    })

    if (!existingReport) {
      return {
        success: false,
        error: 'Report not found',
        message: 'Laporan tidak ditemukan'
      }
    }

    const report = await prisma.reports.update({
      where: { id: reportId },
      data: {
        status: 'REJECTED',
        feedback: feedback || 'Laporan ditolak tanpa feedback spesifik',
        rejected_at: new Date(),
        verified_at: null, // Clear any previous verification date
        updated_at: new Date()
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true
          }
        }
      }
    })

    return {
      success: true,
      report,
      message: 'Laporan berhasil ditolak'
    }
  } catch (error) {
    console.error('Error rejecting report:', error)
    return {
      success: false,
      error: 'Failed to reject report',
      message: 'Gagal menolak laporan'
    }
  }
}

// Helper function to format time ago in Indonesian
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Baru saja'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`
  return date.toLocaleDateString('id-ID')
}

// User management functions
export interface UserData {
  id: string
  name: string | null
  username: string
  email: string
  role: string
  training: string | null
  angkatan: string | null
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
  disabled_at?: Date | null
}

export interface CreateUserData {
  name: string
  username: string
  email: string
  password: string
  role: string
  training?: string
  angkatan?: string
}

export interface UpdateUserData {
  name?: string
  username?: string
  email?: string
  password?: string
  role?: string
  training?: string
  angkatan?: string
}

// Get all users with filtering and pagination
export async function getUsers(page = 1, limit = 10, roleFilter?: string, statusFilter?: string, search?: string) {
  try {
    // Validate inputs
    if (page < 1) page = 1
    if (limit < 1 || limit > 100) limit = 10

    const where: any = {}

    // Role filter
    if (roleFilter && roleFilter !== 'all') {
      where.role = roleFilter.toUpperCase()
    }

    // Search filter
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim(), mode: 'insensitive' } },
        { username: { contains: search.trim(), mode: 'insensitive' } },
        { email: { contains: search.trim(), mode: 'insensitive' } }
      ]
    }

    console.log('Fetching users with where clause:', JSON.stringify(where, null, 2))

    const [users, total] = await Promise.all([
      prisma.users.findMany({
        where,
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          training: true,
          angkatan: true,
          created_at: true,
          updated_at: true
        },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.users.count({ where })
    ])

    // Transform users to include status based on a more sophisticated approach
    const transformedUsers: UserData[] = users.map(user => {
      // Check if user has been "disabled" by looking at a pattern in updated_at
      // We'll consider a user inactive if they were "disabled" (updated_at set to a specific pattern)
      // or if they haven't been active for a very long time (6 months)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      // Strategy 1: Check if updated_at is exactly the same as created_at (never updated = potentially inactive)
      // Strategy 2: Check if last update was more than 6 months ago
      const neverUpdated = user.updated_at.getTime() === user.created_at.getTime()
      const veryOld = user.updated_at < sixMonthsAgo

      // For demo purposes, we'll use a simpler approach:
      // Users are considered active unless they are very old or admin has "disabled" them
      const status: "active" | "inactive" = (veryOld || neverUpdated) ? "inactive" : "active"

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        training: user.training,
        angkatan: user.angkatan,
        status,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    })

    // Apply status filter after transformation
    let filteredUsers = transformedUsers
    if (statusFilter && statusFilter !== 'all') {
      filteredUsers = transformedUsers.filter(user => user.status === statusFilter)
    }

    console.log(`Successfully fetched ${filteredUsers.length} users out of ${total} total`)

    return {
      success: true,
      users: filteredUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length, // Use filtered count
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      success: false,
      error: 'Failed to fetch users',
      users: [],
      pagination: {
        page: page || 1,
        limit: limit || 10,
        total: 0,
        totalPages: 0
      }
    }
  }
}

// Create a new user
export async function createUser(userData: CreateUserData) {
  try {
    // Validate required fields
    if (!userData.name || !userData.username || !userData.email || !userData.password) {
      return {
        success: false,
        error: 'Missing required fields',
        message: 'Semua field wajib harus diisi'
      }
    }

    // Validate password length
    if (userData.password.length < 8) {
      return {
        success: false,
        error: 'Password too short',
        message: 'Password minimal 8 karakter'
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: 'Invalid email format',
        message: 'Format email tidak valid'
      }
    }

    // Check if username or email already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: userData.username },
          { email: userData.email }
        ]
      }
    })

    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
        message: 'Username atau email sudah digunakan'
      }
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Generate unique ID
    const crypto = require('crypto')
    const userId = crypto.randomUUID()

    const user = await prisma.users.create({
      data: {
        id: userId,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role.toUpperCase() as Role,
        training: userData.training || null,
        angkatan: userData.angkatan || null,
        updated_at: new Date()
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        training: true,
        angkatan: true,
        created_at: true,
        updated_at: true
      }
    })

    return {
      success: true,
      user,
      message: 'User berhasil dibuat'
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return {
      success: false,
      error: 'Failed to create user',
      message: 'Gagal membuat user baru'
    }
  }
}

// Update a user
export async function updateUser(userId: string, userData: UpdateUserData) {
  try {
    if (!userId || typeof userId !== 'string') {
      return {
        success: false,
        error: 'Invalid user ID',
        message: 'ID user tidak valid'
      }
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User not found',
        message: 'User tidak ditemukan'
      }
    }

    // Validate email format if provided
    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        return {
          success: false,
          error: 'Invalid email format',
          message: 'Format email tidak valid'
        }
      }
    }

    // Validate password length if provided
    if (userData.password && userData.password.trim() && userData.password.length < 8) {
      return {
        success: false,
        error: 'Password too short',
        message: 'Password minimal 8 karakter'
      }
    }

    // Check if username or email already exists (excluding current user)
    if (userData.username || userData.email) {
      const duplicateUser = await prisma.users.findFirst({
        where: {
          AND: [
            { id: { not: userId } },
            {
              OR: [
                ...(userData.username ? [{ username: userData.username }] : []),
                ...(userData.email ? [{ email: userData.email }] : [])
              ]
            }
          ]
        }
      })

      if (duplicateUser) {
        return {
          success: false,
          error: 'Username or email already exists',
          message: 'Username atau email sudah digunakan'
        }
      }
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date()
    }

    if (userData.name !== undefined) updateData.name = userData.name
    if (userData.username !== undefined) updateData.username = userData.username
    if (userData.email !== undefined) updateData.email = userData.email
    if (userData.role !== undefined) updateData.role = userData.role.toUpperCase() as Role
    if (userData.training !== undefined) updateData.training = userData.training || null
    if (userData.angkatan !== undefined) updateData.angkatan = userData.angkatan || null

    // Hash password if provided
    if (userData.password && userData.password.trim()) {
      updateData.password = await bcrypt.hash(userData.password, 12)
    }

    const user = await prisma.users.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        training: true,
        angkatan: true,
        created_at: true,
        updated_at: true
      }
    })

    return {
      success: true,
      user,
      message: 'User berhasil diperbarui'
    }
  } catch (error) {
    console.error('Error updating user:', error)
    return {
      success: false,
      error: 'Failed to update user',
      message: 'Gagal memperbarui user'
    }
  }
}

// Delete a user
export async function deleteUser(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return {
        success: false,
        error: 'Invalid user ID',
        message: 'ID user tidak valid'
      }
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User not found',
        message: 'User tidak ditemukan'
      }
    }

    // Check if user has reports or other related data
    const userReports = await prisma.reports.count({
      where: { author_id: userId }
    })

    if (userReports > 0) {
      return {
        success: false,
        error: 'User has related data',
        message: `User tidak dapat dihapus karena memiliki ${userReports} laporan. Hapus laporan terlebih dahulu.`
      }
    }

    await prisma.users.delete({
      where: { id: userId }
    })

    return {
      success: true,
      message: 'User berhasil dihapus'
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return {
      success: false,
      error: 'Failed to delete user',
      message: 'Gagal menghapus user'
    }
  }
}

// Toggle user status (activate/deactivate)
export async function toggleUserStatus(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return {
        success: false,
        error: 'Invalid user ID',
        message: 'ID user tidak valid'
      }
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User not found',
        message: 'User tidak ditemukan'
      }
    }

    // Determine current status
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const neverUpdated = existingUser.updated_at.getTime() === existingUser.created_at.getTime()
    const veryOld = existingUser.updated_at < sixMonthsAgo
    const isCurrentlyActive = !(veryOld || neverUpdated)

    // Toggle status by updating the updated_at field strategically
    let newUpdatedAt: Date
    let newStatus: string

    if (isCurrentlyActive) {
      // Deactivate user by setting updated_at to a very old date (6 months ago)
      newUpdatedAt = sixMonthsAgo
      newStatus = 'inactive'
    } else {
      // Activate user by setting updated_at to current time
      newUpdatedAt = new Date()
      newStatus = 'active'
    }

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        updated_at: newUpdatedAt
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        training: true,
        angkatan: true,
        created_at: true,
        updated_at: true
      }
    })

    return {
      success: true,
      user,
      status: newStatus,
      message: `User berhasil ${newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`
    }
  } catch (error) {
    console.error('Error toggling user status:', error)
    return {
      success: false,
      error: 'Failed to toggle user status',
      message: 'Gagal mengubah status user'
    }
  }
}

// Fix folder mapping for all completed reports
export async function fixFolderMappingAction() {
  try {
    console.log('Starting folder mapping fix for all completed reports...')

    // Get all completed reports with their files
    const completedReports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        files: true
      }
    })

    let processedFiles = 0
    let movedFiles = 0
    let errors = 0

    const fs = require('fs').promises
    const path = require('path')
    const { existsSync } = require('fs')

    for (const report of completedReports) {
      if (!report.files || report.files.length === 0) continue

      for (const file of report.files) {
        try {
          processedFiles++

          // PERBAIKAN: Validasi data file yang lebih ketat
          if (!file.year || !file.batch || !file.filename) {
            console.warn(`File ${file.id} missing required data (year: ${file.year}, batch: ${file.batch}, filename: ${file.filename}), skipping`)
            continue
          }

          // Validasi tahun dan angkatan
          const fileYear = parseInt(file.year)
          if (isNaN(fileYear) || fileYear < 2020 || fileYear > 2030) {
            console.error(`File ${file.id} has invalid year: ${file.year}, skipping`)
            errors++
            continue
          }

          const validBatches = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
          if (!validBatches.includes(file.batch)) {
            console.error(`File ${file.id} has invalid batch: ${file.batch}, skipping`)
            errors++
            continue
          }

          // Construct expected folder path based on validated file data
          const expectedRelativePath = path.join('uploads', 'reports', file.year, file.batch)
          const expectedFullPath = path.join(process.cwd(), 'public', expectedRelativePath)
          const expectedFilePath = path.join(expectedFullPath, file.filename)

          // Current file path
          const currentFullPath = path.join(process.cwd(), 'public', file.file_path)

          // Validasi bahwa file source ada
          if (!existsSync(currentFullPath)) {
            console.error(`Source file not found: ${currentFullPath} for file ${file.id}`)
            errors++
            continue
          }

          // Check if file is in the correct location
          const currentDir = path.dirname(file.file_path).replace(/\\/g, '/')
          const expectedDir = expectedRelativePath.replace(/\\/g, '/')

          if (currentDir !== expectedDir) {
            console.log(`📁 File ${file.filename} needs to be moved from ${currentDir} to ${expectedDir}`)

            // Validasi bahwa target directory masuk akal
            if (expectedDir.includes(file.year) && expectedDir.includes(file.batch)) {
              // Create target directory if it doesn't exist
              if (!existsSync(expectedFullPath)) {
                await fs.mkdir(expectedFullPath, { recursive: true })
                console.log(`📂 Created directory: ${expectedFullPath}`)
              }

              // Move file only if target doesn't exist
              if (!existsSync(expectedFilePath)) {
                await fs.rename(currentFullPath, expectedFilePath)

                // Update file path in database
                await prisma.uploaded_files.update({
                  where: { id: file.id },
                  data: {
                    file_path: path.join(expectedRelativePath, file.filename).replace(/\\/g, '/'),
                    updated_at: new Date()
                  }
                })

                movedFiles++
                console.log(`✅ Successfully moved file ${file.filename} from ${currentDir} to ${expectedDir}`)
              } else {
                console.warn(`Target file already exists: ${expectedFilePath}`)
              }
            } else {
              console.error(`Invalid target directory detected: ${expectedDir}, skipping for safety`)
            }
          } else {
            console.log(`✓ File ${file.filename} is already in correct location: ${currentDir}`)
          }
        } catch (fileError) {
          console.error(`Error processing file ${file.id}:`, fileError)
          errors++
        }
      }
    }

    const message = `Folder mapping fix completed. Processed: ${processedFiles} files, Moved: ${movedFiles} files, Errors: ${errors}`
    console.log(message)

    return {
      success: true,
      message,
      stats: {
        totalReports: completedReports.length,
        processedFiles,
        movedFiles,
        errors
      }
    }
  } catch (error) {
    console.error('Error fixing folder mapping:', error)
    return {
      success: false,
      error: 'Failed to fix folder mapping',
      message: 'Gagal memperbaiki pemetaan folder'
    }
  }
}

// Export visitor statistics to CSV
export async function exportVisitorStatsAction(period: string = "30") {
  try {
    const periodDays = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    // Get visitor statistics data
    const [visitorStats, topPages, trafficSources, guestbookAnalytics] = await Promise.all([
      getVisitorStats(),
      getTopPages(),
      getTrafficSources(),
      getGuestbookAnalytics()
    ])

    // Get detailed visitor analytics if available
    let detailedVisitorData: any[] = []
    try {
      const visitorAnalytics = await prisma.visitor_analytics.findMany({
        where: {
          created_at: { gte: startDate }
        },
        orderBy: { created_at: 'desc' },
        take: 1000 // Limit to prevent memory issues
      })

      detailedVisitorData = visitorAnalytics.map(record => ({
        tanggal: record.created_at.toLocaleDateString('id-ID'),
        waktu: record.created_at.toLocaleTimeString('id-ID'),
        halaman: record.page_title || record.page_path,
        path: record.page_path,
        ip_address: record.ip_address || 'N/A',
        user_agent: record.user_agent || 'N/A',
        referrer: record.referrer || 'Direct'
      }))
    } catch (error) {
      console.log('No visitor analytics table found, using mock data')
      // Generate mock detailed data
      for (let i = 0; i < 50; i++) {
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * periodDays))
        detailedVisitorData.push({
          tanggal: date.toLocaleDateString('id-ID'),
          waktu: date.toLocaleTimeString('id-ID'),
          halaman: topPages[Math.floor(Math.random() * topPages.length)]?.page || 'Beranda',
          path: '/',
          ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          referrer: trafficSources[Math.floor(Math.random() * trafficSources.length)]?.source || 'Direct'
        })
      }
    }

    // Get guestbook entries for the period
    let guestbookData: any[] = []
    try {
      const guestbookEntries = await prisma.guestbook_entries.findMany({
        where: {
          created_at: { gte: startDate }
        },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          is_approved: true,
          created_at: true
        }
      })

      guestbookData = guestbookEntries.map(entry => ({
        tanggal: entry.created_at.toLocaleDateString('id-ID'),
        waktu: entry.created_at.toLocaleTimeString('id-ID'),
        nama: entry.name,
        email: entry.email || 'N/A',
        pesan: entry.message,
        status: entry.is_approved ? 'Disetujui' : 'Menunggu'
      }))
    } catch (error) {
      console.log('Error fetching guestbook data:', error)
    }

    // Prepare CSV data structure
    const csvData = {
      summary: {
        periode: `${periodDays} hari terakhir`,
        tanggal_export: new Date().toLocaleDateString('id-ID'),
        total_pengunjung: visitorStats.totalVisitors,
        pengunjung_unik: visitorStats.uniqueVisitors,
        entri_buku_tamu: visitorStats.guestbookEntries,
        rata_rata_sesi: visitorStats.avgSessionTime,
        pertumbuhan_pengunjung: `${visitorStats.visitorGrowth}%`,
        pertumbuhan_unik: `${visitorStats.uniqueVisitorGrowth}%`,
        pertumbuhan_buku_tamu: `${visitorStats.guestbookGrowth}%`
      },
      topPages: topPages.map(page => ({
        halaman: page.page,
        kunjungan: page.visits,
        persentase: page.percentage
      })),
      trafficSources: trafficSources.map(source => ({
        sumber: source.source,
        pengunjung: source.visitors,
        persentase: `${source.percentage}%`
      })),
      guestbookAnalytics: {
        total_entri: guestbookAnalytics.totalEntries,
        entri_disetujui: guestbookAnalytics.approvedEntries,
        entri_menunggu: guestbookAnalytics.pendingEntries,
        tingkat_persetujuan: guestbookAnalytics.totalEntries > 0
          ? `${Math.round((guestbookAnalytics.approvedEntries / guestbookAnalytics.totalEntries) * 100)}%`
          : '0%'
      },
      detailedVisitors: detailedVisitorData,
      guestbookEntries: guestbookData
    }

    return {
      success: true,
      data: csvData
    }
  } catch (error) {
    console.error('Error exporting visitor stats:', error)
    return {
      success: false,
      error: 'Failed to export visitor statistics',
      message: 'Gagal mengekspor statistik pengunjung'
    }
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return {
        success: false,
        error: 'Invalid user ID',
        message: 'ID user tidak valid'
      }
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        training: true,
        angkatan: true,
        phone: true,
        avatar: true,
        created_at: true,
        updated_at: true
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        message: 'User tidak ditemukan'
      }
    }

    // Determine status
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const neverUpdated = user.updated_at.getTime() === user.created_at.getTime()
    const veryOld = user.updated_at < sixMonthsAgo
    const status: "active" | "inactive" = (veryOld || neverUpdated) ? "inactive" : "active"

    return {
      success: true,
      user: {
        ...user,
        status
      }
    }
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return {
      success: false,
      error: 'Failed to get user',
      message: 'Gagal mengambil data user'
    }
  }
}

// Get user statistics
export async function getUserStats() {
  try {
    const [totalUsers, adminCount, userCount, moderatorCount] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { role: 'ADMIN' } }),
      prisma.users.count({ where: { role: 'USER' } }),
      prisma.users.count({ where: { role: 'MODERATOR' } })
    ])

    // Get users with training programs
    const trainingStats = await prisma.users.groupBy({
      by: ['training'],
      _count: { training: true },
      where: { training: { not: null } }
    })

    // Get users created in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentUsers = await prisma.users.count({
      where: { created_at: { gte: thirtyDaysAgo } }
    })

    // Calculate active/inactive users
    const allUsers = await prisma.users.findMany({
      select: {
        created_at: true,
        updated_at: true
      }
    })

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    let activeUsers = 0
    let inactiveUsers = 0

    allUsers.forEach(user => {
      const neverUpdated = user.updated_at.getTime() === user.created_at.getTime()
      const veryOld = user.updated_at < sixMonthsAgo

      if (veryOld || neverUpdated) {
        inactiveUsers++
      } else {
        activeUsers++
      }
    })

    return {
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        recentUsers,
        roleDistribution: {
          admin: adminCount,
          user: userCount,
          moderator: moderatorCount
        },
        trainingPrograms: trainingStats.map(stat => ({
          training: stat.training || 'Tidak Ada',
          count: stat._count.training
        }))
      }
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    return {
      success: false,
      error: 'Failed to get user statistics',
      message: 'Gagal mengambil statistik user'
    }
  }
}

// Batch activate users
export async function batchActivateUsers(userIds: string[]) {
  try {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return {
        success: false,
        error: 'Invalid user IDs',
        message: 'Daftar ID user tidak valid'
      }
    }

    // Validate that all IDs are strings
    const validIds = userIds.filter(id => typeof id === 'string' && id.trim())
    if (validIds.length === 0) {
      return {
        success: false,
        error: 'No valid user IDs',
        message: 'Tidak ada ID user yang valid'
      }
    }

    // Check if users exist
    const existingUsers = await prisma.users.findMany({
      where: { id: { in: validIds } },
      select: { id: true, username: true }
    })

    if (existingUsers.length !== validIds.length) {
      return {
        success: false,
        error: 'Some users not found',
        message: 'Beberapa user tidak ditemukan'
      }
    }

    // Activate users by setting updated_at to current time
    await prisma.users.updateMany({
      where: { id: { in: validIds } },
      data: { updated_at: new Date() }
    })

    return {
      success: true,
      message: `${validIds.length} user berhasil diaktifkan`,
      count: validIds.length
    }
  } catch (error) {
    console.error('Error batch activating users:', error)
    return {
      success: false,
      error: 'Failed to activate users',
      message: 'Gagal mengaktifkan user secara batch'
    }
  }
}

// Batch deactivate users
export async function batchDeactivateUsers(userIds: string[]) {
  try {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return {
        success: false,
        error: 'Invalid user IDs',
        message: 'Daftar ID user tidak valid'
      }
    }

    // Validate that all IDs are strings
    const validIds = userIds.filter(id => typeof id === 'string' && id.trim())
    if (validIds.length === 0) {
      return {
        success: false,
        error: 'No valid user IDs',
        message: 'Tidak ada ID user yang valid'
      }
    }

    // Check if users exist and none of them are admin (safety check)
    const existingUsers = await prisma.users.findMany({
      where: { id: { in: validIds } },
      select: { id: true, username: true, role: true }
    })

    if (existingUsers.length !== validIds.length) {
      return {
        success: false,
        error: 'Some users not found',
        message: 'Beberapa user tidak ditemukan'
      }
    }

    // Check if any user is admin
    const adminUsers = existingUsers.filter(user => user.role === 'ADMIN')
    if (adminUsers.length > 0) {
      return {
        success: false,
        error: 'Cannot deactivate admin users',
        message: 'Tidak dapat menonaktifkan user admin'
      }
    }

    // Deactivate users by setting updated_at to 6 months ago
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    await prisma.users.updateMany({
      where: { id: { in: validIds } },
      data: { updated_at: sixMonthsAgo }
    })

    return {
      success: true,
      message: `${validIds.length} user berhasil dinonaktifkan`,
      count: validIds.length
    }
  } catch (error) {
    console.error('Error batch deactivating users:', error)
    return {
      success: false,
      error: 'Failed to deactivate users',
      message: 'Gagal menonaktifkan user secara batch'
    }
  }
}

// Batch delete users
export async function batchDeleteUsers(userIds: string[]) {
  try {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return {
        success: false,
        error: 'Invalid user IDs',
        message: 'Daftar ID user tidak valid'
      }
    }

    // Validate that all IDs are strings
    const validIds = userIds.filter(id => typeof id === 'string' && id.trim())
    if (validIds.length === 0) {
      return {
        success: false,
        error: 'No valid user IDs',
        message: 'Tidak ada ID user yang valid'
      }
    }

    // Check if users exist and get their data
    const existingUsers = await prisma.users.findMany({
      where: { id: { in: validIds } },
      select: { id: true, username: true, role: true }
    })

    if (existingUsers.length !== validIds.length) {
      return {
        success: false,
        error: 'Some users not found',
        message: 'Beberapa user tidak ditemukan'
      }
    }

    // Check if any user is admin
    const adminUsers = existingUsers.filter(user => user.role === 'ADMIN')
    if (adminUsers.length > 0) {
      return {
        success: false,
        error: 'Cannot delete admin users',
        message: 'Tidak dapat menghapus user admin'
      }
    }

    // Check if users have reports or other related data
    const userReports = await prisma.reports.count({
      where: { author_id: { in: validIds } }
    })

    if (userReports > 0) {
      return {
        success: false,
        error: 'Users have related data',
        message: `User tidak dapat dihapus karena memiliki ${userReports} laporan. Hapus laporan terlebih dahulu.`
      }
    }

    // Delete users
    await prisma.users.deleteMany({
      where: { id: { in: validIds } }
    })

    return {
      success: true,
      message: `${validIds.length} user berhasil dihapus`,
      count: validIds.length
    }
  } catch (error) {
    console.error('Error batch deleting users:', error)
    return {
      success: false,
      error: 'Failed to delete users',
      message: 'Gagal menghapus user secara batch'
    }
  }
}

// Change user password (admin function)
export async function changeUserPassword(userId: string, newPassword: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return {
        success: false,
        error: 'Invalid user ID',
        message: 'ID user tidak valid'
      }
    }

    if (!newPassword || newPassword.length < 8) {
      return {
        success: false,
        error: 'Invalid password',
        message: 'Password minimal 8 karakter'
      }
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User not found',
        message: 'User tidak ditemukan'
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await prisma.users.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updated_at: new Date()
      }
    })

    return {
      success: true,
      message: 'Password user berhasil diubah'
    }
  } catch (error) {
    console.error('Error changing user password:', error)
    return {
      success: false,
      error: 'Failed to change password',
      message: 'Gagal mengubah password user'
    }
  }
}

// PERBAIKAN: Fungsi untuk mengaudit data file dan mencari inkonsistensi
export async function auditFileDataAction() {
  try {
    console.log('🔍 Starting file data audit...')

    // Ambil semua file yang ada
    const allFiles = await prisma.uploaded_files.findMany({
      include: {
        reports: {
          select: {
            id: true,
            title: true,
            status: true,
            created_at: true
          }
        },
        users: {
          select: {
            id: true,
            username: true,
            training: true,
            angkatan: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    let totalFiles = allFiles.length
    let invalidYearFiles = 0
    let invalidBatchFiles = 0
    let missingMetadata = 0
    let inconsistentFiles = 0

    const issues = []

    for (const file of allFiles) {
      let hasIssue = false

      // Check missing metadata
      if (!file.year || !file.batch || !file.category) {
        missingMetadata++
        hasIssue = true
        issues.push({
          fileId: file.id,
          filename: file.original_name,
          issue: 'Missing metadata',
          details: `year: ${file.year}, batch: ${file.batch}, category: ${file.category}`,
          reportId: file.report_id,
          created_at: file.created_at
        })
      }

      // Check invalid year
      if (file.year) {
        const yearNum = parseInt(file.year)
        if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
          invalidYearFiles++
          hasIssue = true
          issues.push({
            fileId: file.id,
            filename: file.original_name,
            issue: 'Invalid year',
            details: `year: ${file.year}`,
            reportId: file.report_id,
            created_at: file.created_at
          })
        }
      }

      // Check invalid batch
      if (file.batch) {
        const validBatches = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
        if (!validBatches.includes(file.batch)) {
          invalidBatchFiles++
          hasIssue = true
          issues.push({
            fileId: file.id,
            filename: file.original_name,
            issue: 'Invalid batch',
            details: `batch: ${file.batch}`,
            reportId: file.report_id,
            created_at: file.created_at
          })
        }
      }

      // Check inconsistency between file metadata and user profile
      if (file.users && file.year && file.batch) {
        const userAngkatan = file.users.angkatan
        const userTraining = file.users.training

        // Jika ada perbedaan signifikan, tandai sebagai inconsistent
        if (userAngkatan && userAngkatan !== file.batch) {
          inconsistentFiles++
          issues.push({
            fileId: file.id,
            filename: file.original_name,
            issue: 'Inconsistent data',
            details: `File batch: ${file.batch}, User angkatan: ${userAngkatan}`,
            reportId: file.report_id,
            created_at: file.created_at
          })
        }
      }
    }

    const summary = {
      totalFiles,
      invalidYearFiles,
      invalidBatchFiles,
      missingMetadata,
      inconsistentFiles,
      totalIssues: issues.length
    }

    console.log('📊 Audit Summary:', summary)

    return {
      success: true,
      summary,
      issues: issues.slice(0, 50), // Limit untuk performa
      message: `Audit completed. Found ${issues.length} issues out of ${totalFiles} files.`
    }
  } catch (error) {
    console.error('Error during file data audit:', error)
    return {
      success: false,
      error: 'Failed to audit file data',
      message: 'Gagal mengaudit data file'
    }
  }
}

// PERBAIKAN: Fungsi untuk memperbaiki file yang terdeteksi bermasalah
export async function fixProblematicFilesAction() {
  try {
    console.log('🔧 Starting fix for problematic files...')

    // Ambil semua file yang berpotensi bermasalah
    const problematicFiles = await prisma.uploaded_files.findMany({
      where: {
        OR: [
          { year: null },
          { batch: null },
          { year: { notIn: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'] } },
          { batch: { notIn: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] } }
        ]
      },
      include: {
        reports: {
          select: {
            id: true,
            title: true,
            status: true,
            content: true
          }
        },
        users: {
          select: {
            username: true,
            training: true,
            angkatan: true
          }
        }
      }
    })

    let fixedFiles = 0
    let skippedFiles = 0
    const fixLog = []

    for (const file of problematicFiles) {
      try {
        let needsUpdate = false
        const updates: any = {}

        // Coba ekstrak tahun dan angkatan dari konten laporan jika tersedia
        if (file.reports && file.reports.content) {
          const content = file.reports.content

          // Ekstrak tahun dari konten
          const yearMatch = content.match(/tahun.*?(\d{4})/i) || content.match(/(\d{4})/g)
          if (yearMatch && !file.year) {
            const extractedYear = yearMatch[1] || yearMatch[0]
            const yearNum = parseInt(extractedYear)
            if (yearNum >= 2020 && yearNum <= 2030) {
              updates.year = extractedYear
              needsUpdate = true
              fixLog.push(`File ${file.id}: Set year to ${extractedYear} from content`)
            }
          }

          // Ekstrak angkatan dari konten
          const batchMatch = content.match(/angkatan\s*(I{1,3}|IV|V|VI|VII|VIII|IX|X|XI|XII)/i)
          if (batchMatch && !file.batch) {
            const extractedBatch = batchMatch[1].toUpperCase()
            updates.batch = extractedBatch
            needsUpdate = true
            fixLog.push(`File ${file.id}: Set batch to ${extractedBatch} from content`)
          }
        }

        // Jika tidak bisa dari konten, gunakan default berdasarkan tanggal upload
        if (!updates.year && !file.year) {
          const uploadYear = file.created_at.getFullYear().toString()
          updates.year = uploadYear
          needsUpdate = true
          fixLog.push(`File ${file.id}: Set year to ${uploadYear} based on upload date`)
        }

        if (!updates.batch && !file.batch) {
          // Gunakan angkatan user sebagai fallback terakhir
          if (file.users && file.users.angkatan) {
            const validBatches = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
            if (validBatches.includes(file.users.angkatan)) {
              updates.batch = file.users.angkatan
              needsUpdate = true
              fixLog.push(`File ${file.id}: Set batch to ${file.users.angkatan} from user profile`)
            }
          } else {
            // Default ke angkatan I jika tidak ada data lain
            updates.batch = 'I'
            needsUpdate = true
            fixLog.push(`File ${file.id}: Set batch to I as default`)
          }
        }

        if (needsUpdate) {
          await prisma.uploaded_files.update({
            where: { id: file.id },
            data: {
              ...updates,
              updated_at: new Date()
            }
          })
          fixedFiles++
        } else {
          skippedFiles++
        }
      } catch (error) {
        console.error(`Error fixing file ${file.id}:`, error)
        skippedFiles++
      }
    }

    const summary = {
      totalProblematicFiles: problematicFiles.length,
      fixedFiles,
      skippedFiles,
      fixLog: fixLog.slice(0, 20) // Limit log untuk performa
    }

    console.log('🔧 Fix Summary:', summary)

    return {
      success: true,
      summary,
      message: `Fixed ${fixedFiles} files out of ${problematicFiles.length} problematic files.`
    }
  } catch (error) {
    console.error('Error fixing problematic files:', error)
    return {
      success: false,
      error: 'Failed to fix problematic files',
      message: 'Gagal memperbaiki file bermasalah'
    }
  }
}
