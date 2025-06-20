import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Master Years (2017-2027)
  const years = Array.from({ length: 11 }, (_, i) => (2017 + i).toString())
  for (const year of years) {
    await prisma.master_years.upsert({
      where: { year },
      update: {},
      create: {
        year,
        is_active: true,
      },
    })
  }
  console.log('✅ Master years seeded (2017-2027)')

  // Seed Master Cohorts (I-V)
  const cohortNames = ['I', 'II', 'III', 'IV', 'V']
  for (const name of cohortNames) {
    await prisma.master_cohorts.upsert({
      where: { name },
      update: {},
      create: {
        name,
        is_active: true,
      },
    })
  }
  console.log('✅ Master cohorts seeded (I-V)')

  // Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.users.upsert({
    where: { email: 'admin@example.com' },
    update: { updated_at: new Date() },
    create: {
      id: 'admin-1',
      email: 'admin@example.com',
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
      name: 'Administrator',
      updated_at: new Date(),
    },
  })

  // Seed Training Programs
  const trainingPrograms = [
    {
      id: 'prog-pkn',
      name: 'PKN',
      full_name: 'Pelatihan Kepemimpinan Nasional',
      description: 'Program pelatihan kepemimpinan tingkat nasional untuk aparatur sipil negara',
      duration_days: 30,
    },
    {
      id: 'prog-pkp',
      name: 'PKP',
      full_name: 'Pelatihan Kepemimpinan Pengawas',
      description: 'Program pelatihan kepemimpinan untuk jabatan pengawas',
      duration_days: 25,
    },
    {
      id: 'prog-pka',
      name: 'PKA',
      full_name: 'Pelatihan Kepemimpinan Administrator',
      description: 'Program pelatihan kepemimpinan untuk jabatan administrator',
      duration_days: 20,
    },
    {
      id: 'prog-latsar',
      name: 'LATSAR',
      full_name: 'Pelatihan Dasar CPNS',
      description: 'Pelatihan dasar untuk calon pegawai negeri sipil',
      duration_days: 20,
    },
  ]

  for (const program of trainingPrograms) {
    await prisma.training_programs.upsert({
      where: { name: program.name },
      update: program,
      create: program,
    })
  }

  // Seed Training Cohorts untuk tahun 2024
  const cohorts = [
    {
      id: 'cohort-pkn-2024-1',
      name: 'I',
      training_program_id: 'prog-pkn',
      year: '2024',
      status: 'ONGOING' as const,
      max_participants: 30,
      current_participants: 25,
      description: 'Angkatan pertama PKN tahun 2024',
    },
    {
      id: 'cohort-pkn-2024-2',
      name: 'II',
      training_program_id: 'prog-pkn',
      year: '2024',
      status: 'PLANNING' as const,
      max_participants: 30,
      description: 'Angkatan kedua PKN tahun 2024',
    },
    {
      id: 'cohort-pkp-2024-1',
      name: 'I',
      training_program_id: 'prog-pkp',
      year: '2024',
      status: 'COMPLETED' as const,
      max_participants: 25,
      current_participants: 25,
      description: 'Angkatan pertama PKP tahun 2024',
    },
    {
      id: 'cohort-latsar-2024-1',
      name: 'I',
      training_program_id: 'prog-latsar',
      year: '2024',
      status: 'ONGOING' as const,
      max_participants: 50,
      current_participants: 45,
      description: 'Angkatan pertama LATSAR tahun 2024',
    },
  ]

  for (const cohort of cohorts) {
    await prisma.training_cohorts.upsert({
      where: {
        training_program_id_name_year: {
          training_program_id: cohort.training_program_id,
          name: cohort.name,
          year: cohort.year
        }
      },
      update: cohort,
      create: cohort,
    })
  }

  // Seed Report Folders dengan koneksi ke training programs dan cohorts
  const reportFolders = [
    {
      id: 'folder-pkn-2024-1',
      year: '2024',
      batch: 'I',
      report_type: 'PKN',
      description: 'Folder laporan PKN angkatan I tahun 2024',
      created_by: admin.id,
      training_program_id: 'prog-pkn',
      cohort_id: 'cohort-pkn-2024-1',
    },
    {
      id: 'folder-pkn-2024-2',
      year: '2024',
      batch: 'II',
      report_type: 'PKN',
      description: 'Folder laporan PKN angkatan II tahun 2024',
      created_by: admin.id,
      training_program_id: 'prog-pkn',
      cohort_id: 'cohort-pkn-2024-2',
    },
    {
      id: 'folder-pkp-2024-1',
      year: '2024',
      batch: 'I',
      report_type: 'PKP',
      description: 'Folder laporan PKP angkatan I tahun 2024',
      created_by: admin.id,
      training_program_id: 'prog-pkp',
      cohort_id: 'cohort-pkp-2024-1',
    },
    {
      id: 'folder-latsar-2024-1',
      year: '2024',
      batch: 'I',
      report_type: 'LATSAR',
      description: 'Folder laporan LATSAR angkatan I tahun 2024',
      created_by: admin.id,
      training_program_id: 'prog-latsar',
      cohort_id: 'cohort-latsar-2024-1',
    },
  ]

  for (const folder of reportFolders) {
    await prisma.report_folders.upsert({
      where: {
        year_batch_report_type: {
          year: folder.year,
          batch: folder.batch,
          report_type: folder.report_type
        }
      },
      update: folder,
      create: folder,
    })
  }

  // Seed Sample User dan buat mereka sebagai anggota cohort
  const userPassword = await bcrypt.hash('password123', 10)
  const sampleUsers = [
    {
      id: 'user-1',
      email: 'john@example.com',
      username: 'john',
      password: userPassword,
      name: 'John Doe',
      training: 'PKN',
      angkatan: 'I',
      training_program_id: 'prog-pkn',
    },
    {
      id: 'user-2',
      email: 'jane@example.com',
      username: 'jane',
      password: userPassword,
      name: 'Jane Smith',
      training: 'PKP',
      angkatan: 'I',
      training_program_id: 'prog-pkp',
    },
  ]

  for (const user of sampleUsers) {
    await prisma.users.upsert({
      where: { email: user.email },
      update: { ...user, updated_at: new Date() },
      create: { ...user, updated_at: new Date() },
    })
  }

  // Seed Cohort Members
  const cohortMembers = [
    {
      id: 'member-1',
      user_id: 'user-1',
      cohort_id: 'cohort-pkn-2024-1',
      status: 'ACTIVE' as const,
    },
    {
      id: 'member-2',
      user_id: 'user-2',
      cohort_id: 'cohort-pkp-2024-1',
      status: 'GRADUATED' as const,
    },
  ]

  for (const member of cohortMembers) {
    await prisma.cohort_members.upsert({
      where: {
        user_id_cohort_id: {
          user_id: member.user_id,
          cohort_id: member.cohort_id
        }
      },
      update: member,
      create: member,
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
      author_id: 'user-1',
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
      author_id: 'user-2',
      updated_at: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('🎓 Training programs, cohorts, folders, and members created!')
  console.log('👤 Admin user: admin / admin123')
  console.log('👤 PKN user: john / password123')
  console.log('👤 PKP user: jane / password123')
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
        user_id: Math.random() > 0.7 ? ['admin-1', 'user-1', 'user-2'][Math.floor(Math.random() * 3)] : null,
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


