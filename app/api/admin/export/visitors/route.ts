import { NextRequest, NextResponse } from 'next/server'
import { exportVisitorStatsAction } from '@/lib/actions/admin'

export async function GET(request: NextRequest) {
  try {
    // Get period from query parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30'

    // Get the export data
    const result = await exportVisitorStatsAction(period)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, message: result.message },
        { status: 500 }
      )
    }

    const { data } = result

    // Generate CSV content
    let csvContent = ''

    // Add summary section
    csvContent += 'RINGKASAN STATISTIK PENGUNJUNG\n'
    csvContent += '================================\n'
    csvContent += `Periode,${data.summary.periode}\n`
    csvContent += `Tanggal Export,${data.summary.tanggal_export}\n`
    csvContent += `Total Pengunjung,${data.summary.total_pengunjung}\n`
    csvContent += `Pengunjung Unik,${data.summary.pengunjung_unik}\n`
    csvContent += `Entri Buku Tamu,${data.summary.entri_buku_tamu}\n`
    csvContent += `Rata-rata Sesi,${data.summary.rata_rata_sesi}\n`
    csvContent += `Pertumbuhan Pengunjung,${data.summary.pertumbuhan_pengunjung}\n`
    csvContent += `Pertumbuhan Unik,${data.summary.pertumbuhan_unik}\n`
    csvContent += `Pertumbuhan Buku Tamu,${data.summary.pertumbuhan_buku_tamu}\n`
    csvContent += '\n\n'

    // Add top pages section
    csvContent += 'HALAMAN POPULER\n'
    csvContent += '===============\n'
    csvContent += 'Halaman,Kunjungan,Persentase\n'
    data.topPages.forEach(page => {
      csvContent += `"${page.halaman}",${page.kunjungan},${page.persentase}\n`
    })
    csvContent += '\n\n'

    // Add traffic sources section
    csvContent += 'SUMBER TRAFFIC\n'
    csvContent += '==============\n'
    csvContent += 'Sumber,Pengunjung,Persentase\n'
    data.trafficSources.forEach(source => {
      csvContent += `"${source.sumber}",${source.pengunjung},${source.persentase}\n`
    })
    csvContent += '\n\n'

    // Add guestbook analytics section
    csvContent += 'ANALITIK BUKU TAMU\n'
    csvContent += '==================\n'
    csvContent += `Total Entri,${data.guestbookAnalytics.total_entri}\n`
    csvContent += `Entri Disetujui,${data.guestbookAnalytics.entri_disetujui}\n`
    csvContent += `Entri Menunggu,${data.guestbookAnalytics.entri_menunggu}\n`
    csvContent += `Tingkat Persetujuan,${data.guestbookAnalytics.tingkat_persetujuan}\n`
    csvContent += '\n\n'

    // Add detailed visitor data section
    if (data.detailedVisitors.length > 0) {
      csvContent += 'DATA DETAIL PENGUNJUNG\n'
      csvContent += '======================\n'
      csvContent += 'Tanggal,Waktu,Halaman,Path,IP Address,User Agent,Referrer\n'
      data.detailedVisitors.forEach(visitor => {
        csvContent += `"${visitor.tanggal}","${visitor.waktu}","${visitor.halaman}","${visitor.path}","${visitor.ip_address}","${visitor.user_agent}","${visitor.referrer}"\n`
      })
      csvContent += '\n\n'
    }

    // Add guestbook entries section
    if (data.guestbookEntries.length > 0) {
      csvContent += 'ENTRI BUKU TAMU\n'
      csvContent += '===============\n'
      csvContent += 'Tanggal,Waktu,Nama,Email,Pesan,Status\n'
      data.guestbookEntries.forEach(entry => {
        csvContent += `"${entry.tanggal}","${entry.waktu}","${entry.nama}","${entry.email}","${entry.pesan}","${entry.status}"\n`
      })
    }

    // Create filename with current date
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const filename = `statistik-pengunjung-${period}-hari-${dateStr}.csv`

    // Return CSV file as downloadable response
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error in export visitors API:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Gagal mengekspor data pengunjung'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { period = '30', format = 'csv' } = body

    // Get the export data
    const result = await exportVisitorStatsAction(period)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, message: result.message },
        { status: 500 }
      )
    }

    const { data } = result

    if (format === 'json') {
      // Return JSON format for further processing
      return NextResponse.json({
        success: true,
        data,
        filename: `statistik-pengunjung-${period}-hari-${new Date().toISOString().split('T')[0]}.json`
      })
    }

    // Default to CSV format (same as GET)
    let csvContent = ''

    // Add summary section
    csvContent += 'RINGKASAN STATISTIK PENGUNJUNG\n'
    csvContent += '================================\n'
    csvContent += `Periode,${data.summary.periode}\n`
    csvContent += `Tanggal Export,${data.summary.tanggal_export}\n`
    csvContent += `Total Pengunjung,${data.summary.total_pengunjung}\n`
    csvContent += `Pengunjung Unik,${data.summary.pengunjung_unik}\n`
    csvContent += `Entri Buku Tamu,${data.summary.entri_buku_tamu}\n`
    csvContent += `Rata-rata Sesi,${data.summary.rata_rata_sesi}\n`
    csvContent += `Pertumbuhan Pengunjung,${data.summary.pertumbuhan_pengunjung}\n`
    csvContent += `Pertumbuhan Unik,${data.summary.pertumbuhan_unik}\n`
    csvContent += `Pertumbuhan Buku Tamu,${data.summary.pertumbuhan_buku_tamu}\n`
    csvContent += '\n\n'

    // Add top pages section
    csvContent += 'HALAMAN POPULER\n'
    csvContent += '===============\n'
    csvContent += 'Halaman,Kunjungan,Persentase\n'
    data.topPages.forEach(page => {
      csvContent += `"${page.halaman}",${page.kunjungan},${page.persentase}\n`
    })
    csvContent += '\n\n'

    // Add traffic sources section
    csvContent += 'SUMBER TRAFFIC\n'
    csvContent += '==============\n'
    csvContent += 'Sumber,Pengunjung,Persentase\n'
    data.trafficSources.forEach(source => {
      csvContent += `"${source.sumber}",${source.pengunjung},${source.persentase}\n`
    })
    csvContent += '\n\n'

    // Add guestbook analytics section
    csvContent += 'ANALITIK BUKU TAMU\n'
    csvContent += '==================\n'
    csvContent += `Total Entri,${data.guestbookAnalytics.total_entri}\n`
    csvContent += `Entri Disetujui,${data.guestbookAnalytics.entri_disetujui}\n`
    csvContent += `Entri Menunggu,${data.guestbookAnalytics.entri_menunggu}\n`
    csvContent += `Tingkat Persetujuan,${data.guestbookAnalytics.tingkat_persetujuan}\n`
    csvContent += '\n\n'

    // Add detailed visitor data section
    if (data.detailedVisitors.length > 0) {
      csvContent += 'DATA DETAIL PENGUNJUNG\n'
      csvContent += '======================\n'
      csvContent += 'Tanggal,Waktu,Halaman,Path,IP Address,User Agent,Referrer\n'
      data.detailedVisitors.forEach(visitor => {
        csvContent += `"${visitor.tanggal}","${visitor.waktu}","${visitor.halaman}","${visitor.path}","${visitor.ip_address}","${visitor.user_agent}","${visitor.referrer}"\n`
      })
      csvContent += '\n\n'
    }

    // Add guestbook entries section
    if (data.guestbookEntries.length > 0) {
      csvContent += 'ENTRI BUKU TAMU\n'
      csvContent += '===============\n'
      csvContent += 'Tanggal,Waktu,Nama,Email,Pesan,Status\n'
      data.guestbookEntries.forEach(entry => {
        csvContent += `"${entry.tanggal}","${entry.waktu}","${entry.nama}","${entry.email}","${entry.pesan}","${entry.status}"\n`
      })
    }

    // Create filename with current date
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const filename = `statistik-pengunjung-${period}-hari-${dateStr}.csv`

    // Return CSV file as downloadable response
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error in export visitors POST API:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Gagal mengekspor data pengunjung'
      },
      { status: 500 }
    )
  }
} 
