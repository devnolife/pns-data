import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.users.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      username: 'admin',
      email: 'admin@pnsdata.com',
      password: adminPassword,
      name: 'Administrator',
      role: 'ADMIN',
      updated_at: new Date(),
    },
  })

  // Create sample users for different training programs
  const userPKN = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      username: 'user_pkn',
      email: 'pkn@pnsdata.com',
      password: await bcrypt.hash('user123', 12),
      name: 'Peserta PKN',
      role: 'USER',
      training: 'PKN',
      angkatan: 'I',
      updated_at: new Date(),
    },
  })

  const userPKA = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      username: 'user_pka',
      email: 'pka@pnsdata.com',
      password: await bcrypt.hash('user123', 12),
      name: 'Peserta PKA',
      role: 'USER',
      training: 'PKA',
      angkatan: 'II',
      updated_at: new Date(),
    },
  })

  const userPKP = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      username: 'user_pkp',
      email: 'pkp@pnsdata.com',
      password: await bcrypt.hash('user123', 12),
      name: 'Peserta PKP',
      role: 'USER',
      training: 'PKP',
      angkatan: 'I',
      updated_at: new Date(),
    },
  })

  const userLatsar = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      username: 'user_latsar',
      email: 'latsar@pnsdata.com',
      password: await bcrypt.hash('user123', 12),
      name: 'Peserta Latsar',
      role: 'USER',
      training: 'LATSAR',
      angkatan: 'III',
      updated_at: new Date(),
    },
  })

  // Create PKN Reports (2023-2024)
  const pknReports = [
    {
      title: 'Analisis Kepemimpinan Transformasional dalam Era Digital',
      description: 'Penelitian mendalam tentang gaya kepemimpinan transformasional di era digitalisasi sektor publik',
      content: `
        <h2>Abstrak</h2>
        <p>Penelitian ini mengkaji penerapan gaya kepemimpinan transformasional dalam menghadapi tantangan digitalisasi di sektor publik. Studi dilakukan terhadap 50 pemimpin di berbagai instansi pemerintah dengan fokus pada adaptasi teknologi dan perubahan organisasi.</p>
        
        <h2>Metodologi</h2>
        <p>Penelitian menggunakan pendekatan kualitatif dan kuantitatif dengan teknik wawancara mendalam, observasi, dan survei terstruktur.</p>
        
        <h2>Hasil dan Pembahasan</h2>
        <p>Hasil penelitian menunjukkan bahwa kepemimpinan transformasional memiliki korelasi positif yang signifikan dengan keberhasilan implementasi digitalisasi di sektor publik.</p>
        
        <h2>Kesimpulan</h2>
        <p>Kepemimpinan transformasional terbukti efektif dalam memimpin perubahan digital di organisasi pemerintah.</p>
      `,
      category: 'PKN',
      author_id: userPKN.id,
      year: 2024,
      angkatan: 'I'
    },
    {
      title: 'Implementasi Good Governance dalam Pelayanan Publik',
      description: 'Studi implementasi prinsip-prinsip good governance untuk meningkatkan kualitas pelayanan publik',
      content: `
        <h2>Abstrak</h2>
        <p>Laporan ini membahas implementasi prinsip-prinsip good governance dalam meningkatkan kualitas pelayanan publik. Penelitian dilakukan di 3 kabupaten dengan menganalisis tingkat kepuasan masyarakat dan efektivitas pelayanan.</p>
        
        <h2>Latar Belakang</h2>
        <p>Good governance menjadi kunci utama dalam meningkatkan kualitas pelayanan publik yang responsif, transparan, dan akuntabel.</p>
        
        <h2>Temuan Penelitian</h2>
        <p>Implementasi good governance terbukti meningkatkan indeks kepuasan masyarakat hingga 85% di ketiga kabupaten yang diteliti.</p>
      `,
      category: 'PKN',
      author_id: userPKN.id,
      year: 2024,
      angkatan: 'I'
    },
    {
      title: 'Strategi Komunikasi Publik di Era Media Sosial',
      description: 'Analisis strategi komunikasi publik yang efektif di era media sosial',
      content: `
        <h2>Pendahuluan</h2>
        <p>Era media sosial mengubah paradigma komunikasi publik secara fundamental. Pemerintah perlu mengadaptasi strategi komunikasi untuk menjangkau masyarakat secara lebih efektif.</p>
        
        <h2>Strategi yang Direkomendasikan</h2>
        <ul>
          <li>Penggunaan multi-platform media sosial</li>
          <li>Konten yang engaging dan informatif</li>
          <li>Respons yang cepat terhadap feedback masyarakat</li>
        </ul>
      `,
      category: 'PKN',
      author_id: admin.id,
      year: 2023,
      angkatan: 'II'
    }
  ]

  // Create PKA Reports
  const pkaReports = [
    {
      title: 'Optimalisasi Sistem Administrasi Kepegawaian Digital',
      description: 'Analisis implementasi sistem administrasi kepegawaian digital untuk meningkatkan efisiensi',
      content: `
        <h2>Latar Belakang</h2>
        <p>Digitalisasi sistem administrasi kepegawaian menjadi kebutuhan mendesak untuk meningkatkan efisiensi dan akurasi data kepegawaian.</p>
        
        <h2>Implementasi Sistem</h2>
        <p>Studi kasus dilakukan di 5 instansi pemerintah dengan fokus pada digitalisasi proses administrasi kepegawaian.</p>
        
        <h2>Hasil</h2>
        <p>Implementasi sistem digital berhasil meningkatkan efisiensi proses administrasi hingga 70% dan mengurangi kesalahan data hingga 90%.</p>
      `,
      category: 'PKA',
      author_id: userPKA.id,
      year: 2024,
      angkatan: 'II'
    },
    {
      title: 'Manajemen Kinerja Berbasis Kompetensi',
      description: 'Pengembangan sistem manajemen kinerja berbasis kompetensi untuk ASN',
      content: `
        <h2>Konsep Manajemen Kinerja</h2>
        <p>Manajemen kinerja berbasis kompetensi merupakan pendekatan holistik dalam mengelola dan mengembangkan kinerja ASN.</p>
        
        <h2>Model yang Dikembangkan</h2>
        <p>Model manajemen kinerja yang dikembangkan mencakup aspek kompetensi teknis, manajerial, dan sosial kultural.</p>
      `,
      category: 'PKA',
      author_id: userPKA.id,
      year: 2024,
      angkatan: 'I'
    }
  ]

  // Create PKP Reports
  const pkpReports = [
    {
      title: 'Strategi Pengawasan Berbasis Risiko di Era New Normal',
      description: 'Pengembangan strategi pengawasan efektif dengan pendekatan berbasis risiko',
      content: `
        <h2>Pendahuluan</h2>
        <p>Era new normal menuntut adaptasi strategi pengawasan yang lebih efektif dan efisien dengan pendekatan berbasis risiko.</p>
        
        <h2>Metodologi Pengawasan</h2>
        <p>Penelitian mencakup analisis terhadap 25 unit kerja di lingkungan pemerintah daerah dengan fokus pada identifikasi dan mitigasi risiko.</p>
        
        <h2>Rekomendasi</h2>
        <p>Strategi pengawasan berbasis risiko terbukti lebih efektif dalam mengidentifikasi dan mencegah potensi masalah dalam organisasi.</p>
      `,
      category: 'PKP',
      author_id: userPKP.id,
      year: 2024,
      angkatan: 'I'
    },
    {
      title: 'Audit Internal dan Tata Kelola Organisasi',
      description: 'Peran audit internal dalam memperkuat tata kelola organisasi pemerintah',
      content: `
        <h2>Peran Audit Internal</h2>
        <p>Audit internal memiliki peran strategis dalam memperkuat tata kelola organisasi dan memastikan pencapaian tujuan organisasi.</p>
        
        <h2>Best Practices</h2>
        <p>Implementasi best practices audit internal dapat meningkatkan efektivitas tata kelola organisasi secara signifikan.</p>
      `,
      category: 'PKP',
      author_id: admin.id,
      year: 2023,
      angkatan: 'II'
    }
  ]

  // Create LATSAR Reports
  const latsarReports = [
    {
      title: 'Pengembangan Kompetensi ASN Melalui Pembelajaran Digital',
      description: 'Evaluasi efektivitas program pengembangan kompetensi ASN melalui platform digital',
      content: `
        <h2>Latar Belakang</h2>
        <p>Pembelajaran digital menjadi metode yang semakin penting dalam pengembangan kompetensi ASN di era digital.</p>
        
        <h2>Metodologi Penelitian</h2>
        <p>Penelitian melibatkan 200 peserta dari berbagai instansi dengan evaluasi terhadap peningkatan kompetensi dan kinerja.</p>
        
        <h2>Hasil Evaluasi</h2>
        <p>Platform pembelajaran digital terbukti efektif meningkatkan kompetensi ASN dengan tingkat kepuasan peserta mencapai 92%.</p>
      `,
      category: 'LATSAR',
      author_id: userLatsar.id,
      year: 2024,
      angkatan: 'III'
    },
    {
      title: 'Aktualisasi Nilai-Nilai Dasar ASN dalam Pelayanan Publik',
      description: 'Implementasi nilai-nilai dasar ASN dalam meningkatkan kualitas pelayanan publik',
      content: `
        <h2>Nilai-Nilai Dasar ASN</h2>
        <p>Nilai-nilai dasar ASN meliputi integritas, profesionalitas, inovasi, tanggung jawab, dan keteladanan.</p>
        
        <h2>Aktualisasi dalam Pelayanan</h2>
        <p>Aktualisasi nilai-nilai dasar ASN dalam pelayanan publik dapat meningkatkan kepercayaan masyarakat terhadap pemerintah.</p>
        
        <h2>Studi Kasus</h2>
        <p>Implementasi di 10 unit pelayanan publik menunjukkan peningkatan indeks kepuasan masyarakat yang signifikan.</p>
      `,
      category: 'LATSAR',
      author_id: userLatsar.id,
      year: 2024,
      angkatan: 'I'
    },
    {
      title: 'Inovasi Pelayanan Publik Berbasis Teknologi',
      description: 'Pengembangan inovasi pelayanan publik dengan memanfaatkan teknologi digital',
      content: `
        <h2>Konsep Inovasi</h2>
        <p>Inovasi pelayanan publik berbasis teknologi merupakan upaya untuk meningkatkan efektivitas dan efisiensi pelayanan.</p>
        
        <h2>Implementasi Teknologi</h2>
        <p>Pemanfaatan teknologi digital dalam pelayanan publik dapat mempercepat proses dan meningkatkan akurasi layanan.</p>
      `,
      category: 'LATSAR',
      author_id: admin.id,
      year: 2023,
      angkatan: 'II'
    }
  ]

  // Insert all reports with varied statuses
  const allReports = [...pknReports, ...pkaReports, ...pkpReports, ...latsarReports]

  for (let i = 0; i < allReports.length; i++) {
    const reportData = allReports[i]

    // Vary the status for testing
    let status: 'PENDING' | 'COMPLETED' | 'REJECTED'
    let feedback: string | undefined
    let verified_at: Date | undefined
    let rejected_at: Date | undefined

    if (i % 3 === 0) {
      status = 'PENDING'
    } else if (i % 3 === 1) {
      status = 'COMPLETED'
      verified_at = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
    } else {
      status = 'REJECTED'
      rejected_at = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
      feedback = [
        'Laporan perlu dilengkapi dengan data statistik yang lebih komprehensif dan referensi yang lebih update.',
        'Metodologi penelitian kurang jelas. Mohon tambahkan penjelasan yang lebih detail tentang metode yang digunakan.',
        'Analisis data perlu diperdalam. Tambahkan interpretasi yang lebih mendalam terhadap hasil penelitian.',
        'Format laporan belum sesuai dengan template yang ditetapkan. Mohon perbaiki struktur dan format penulisan.',
        'Kesimpulan tidak didukung oleh data yang cukup. Perkuat argumentasi dengan evidence yang lebih kuat.'
      ][Math.floor(Math.random() * 5)]
    }

    await prisma.reports.create({
      data: {
        id: crypto.randomUUID(),
        title: reportData.title,
        description: reportData.description,
        content: reportData.content,
        category: reportData.category,
        priority: 'MEDIUM',
        status: status,
        author_id: reportData.author_id,
        feedback: feedback,
        verified_at: verified_at,
        rejected_at: rejected_at,
        created_at: new Date(reportData.year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updated_at: new Date(),
      },
    })
  }

  // Create sample collections
  const collections = [
    {
      title: 'Panduan Administrasi PNS',
      description: 'Kumpulan panduan administrasi untuk PNS',
      content: `
        <h2>Panduan Lengkap Administrasi PNS</h2>
        <p>Panduan ini berisi informasi lengkap mengenai administrasi PNS, termasuk prosedur, formulir, dan kebijakan terbaru.</p>
        
        <h3>Daftar Isi:</h3>
        <ul>
          <li>Prosedur Kepegawaian</li>
          <li>Formulir-formulir Penting</li>
          <li>Kebijakan Terbaru</li>
          <li>FAQ Administrasi</li>
        </ul>
      `,
      category: 'LATSAR',
      author_id: admin.id,
    },
    {
      title: 'Dokumen Kebijakan PKA',
      description: 'Koleksi dokumen kebijakan untuk program PKA',
      content: `
        <h2>Kebijakan Program PKA</h2>
        <p>Kumpulan dokumen kebijakan yang berlaku untuk Program Kepemimpinan Administrator.</p>
        
        <h3>Dokumen Utama:</h3>
        <ul>
          <li>Peraturan Menteri tentang PKA</li>
          <li>Pedoman Pelaksanaan</li>
          <li>Standar Kompetensi</li>
        </ul>
      `,
      category: 'PKA',
      author_id: admin.id,
    },
    {
      title: 'Materi Pelatihan PKP',
      description: 'Koleksi materi pelatihan untuk program PKP',
      content: `
        <h2>Materi Pelatihan PKP</h2>
        <p>Kumpulan materi pelatihan untuk Program Kepemimpinan Pengawas.</p>
        
        <h3>Modul Pelatihan:</h3>
        <ul>
          <li>Teknik Pengawasan Modern</li>
          <li>Audit Berbasis Risiko</li>
          <li>Komunikasi Efektif</li>
        </ul>
      `,
      category: 'PKP',
      author_id: admin.id,
    },
    {
      title: 'Referensi PKN',
      description: 'Koleksi referensi untuk program PKN',
      content: `
        <h2>Referensi Program PKN</h2>
        <p>Kumpulan referensi dan bahan bacaan untuk Program Kepemimpinan Nasional.</p>
        
        <h3>Bahan Referensi:</h3>
        <ul>
          <li>Teori Kepemimpinan</li>
          <li>Studi Kasus</li>
          <li>Best Practices</li>
        </ul>
      `,
      category: 'PKN',
      author_id: admin.id,
    }
  ]

  for (const collectionData of collections) {
    await prisma.collections.create({
      data: {
        id: crypto.randomUUID(),
        title: collectionData.title,
        description: collectionData.description,
        content: collectionData.content,
        category: collectionData.category,
        tags: JSON.stringify([collectionData.category.toLowerCase(), 'panduan', 'referensi']),
        is_public: true,
        author_id: collectionData.author_id,
        updated_at: new Date(),
      },
    })
  }

  // Create sample guestbook entries
  const guestbook1 = await prisma.guestbook_entries.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Ahmad Suryanto',
      email: 'ahmad@example.com',
      message: 'Terima kasih atas layanan yang sangat baik! Website ini sangat membantu dalam mengakses informasi pelatihan.',
      is_approved: true,
      author_id: userPKN.id,
      updated_at: new Date(),
    },
  })

  const guestbook2 = await prisma.guestbook_entries.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Siti Nurhaliza',
      email: 'siti@example.com',
      message: 'Platform yang sangat informatif dan mudah digunakan. Sangat membantu untuk mengakses materi pelatihan.',
      is_approved: true,
      author_id: userPKA.id,
      updated_at: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user: admin / admin123')
  console.log('👤 PKN user: user_pkn / user123')
  console.log('👤 PKA user: user_pka / user123')
  console.log('👤 PKP user: user_pkp / user123')
  console.log('👤 LATSAR user: user_latsar / user123')
  console.log(`📊 Created ${await prisma.reports.count()} reports`)
  console.log(`📚 Created ${await prisma.collections.count()} collections`)
  console.log(`💬 Created ${await prisma.guestbook_entries.count()} guestbook entries`)

  // Create visitor analytics data
  const pages = [
    { path: '/', title: '🏠 Beranda' },
    { path: '/login', title: '🔑 Halaman Login' },
    { path: '/collections', title: '📚 Koleksi Digital' },
    { path: '/guestbook', title: '📝 Buku Tamu' },
    { path: '/register', title: '✨ Halaman Daftar' },
    { path: '/profile', title: '👤 Profil Pengguna' },
    { path: '/dashboard', title: '📊 Dashboard' },
    { path: '/reports', title: '📋 Laporan' }
  ]

  const referrers = [
    'https://google.com',
    'https://facebook.com',
    'https://twitter.com',
    'https://linkedin.com',
    'direct',
    'https://instagram.com'
  ]

  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
    'Mozilla/5.0 (Android 11; Mobile; rv:68.0)'
  ]

  // Generate visitor data for the last 30 days
  const visitorAnalytics = []
  const currentDate = new Date()

  for (let day = 29; day >= 0; day--) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() - day)

    // Generate 20-100 visits per day
    const visitsPerDay = Math.floor(Math.random() * 80) + 20

    for (let visit = 0; visit < visitsPerDay; visit++) {
      const visitTime = new Date(date)
      visitTime.setHours(Math.floor(Math.random() * 24))
      visitTime.setMinutes(Math.floor(Math.random() * 60))

      const page = pages[Math.floor(Math.random() * pages.length)]
      const referrer = referrers[Math.floor(Math.random() * referrers.length)]
      const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)]

      visitorAnalytics.push({
        id: crypto.randomUUID(),
        ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        user_agent: userAgent,
        page_path: page.path,
        page_title: page.title,
        referrer: referrer === 'direct' ? null : referrer,
        session_id: crypto.randomUUID(),
        user_id: Math.random() > 0.7 ? [admin.id, userPKN.id, userPKA.id, userPKP.id, userLatsar.id][Math.floor(Math.random() * 5)] : null,
        visit_duration: Math.floor(Math.random() * 600) + 30, // 30 seconds to 10 minutes
        created_at: visitTime
      })
    }
  }

  // Insert visitor analytics data in batches
  const batchSize = 100
  for (let i = 0; i < visitorAnalytics.length; i += batchSize) {
    const batch = visitorAnalytics.slice(i, i + batchSize)
    await prisma.visitor_analytics.createMany({
      data: batch
    })
  }

  console.log(`📈 Created ${visitorAnalytics.length} visitor analytics entries`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


