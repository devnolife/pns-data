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

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.users.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      username: 'user',
      email: 'user@pnsdata.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER',
      updated_at: new Date(),
    },
  })

  // Create sample reports
  const report1 = await prisma.reports.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Laporan Kinerja Q1 2024',
      description: 'Laporan kinerja triwulan pertama tahun 2024',
      content: 'Ini adalah konten laporan kinerja untuk Q1 2024. Mencakup berbagai aspek kinerja organisasi.',
      category: 'Kinerja',
      priority: 'HIGH',
      status: 'COMPLETED',
      author_id: admin.id,
      assignee_id: user.id,
      updated_at: new Date(),
    },
  })

  const report2 = await prisma.reports.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Laporan Keuangan Bulanan',
      description: 'Laporan keuangan untuk bulan ini',
      content: 'Detail laporan keuangan mencakup pemasukan, pengeluaran, dan analisis budget.',
      category: 'Keuangan',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      author_id: user.id,
      updated_at: new Date(),
    },
  })

  // Create sample collections
  const collection1 = await prisma.collections.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Panduan Administrasi PNS',
      description: 'Kumpulan panduan administrasi untuk PNS',
      content: 'Panduan lengkap mengenai administrasi PNS, termasuk prosedur, formulir, dan kebijakan terbaru.',
      category: 'latsar-cpns',
      tags: JSON.stringify(['panduan', 'administrasi', 'pns', 'prosedur']),
      is_public: true,
      author_id: admin.id,
      updated_at: new Date(),
    },
  })

  const collection2 = await prisma.collections.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Dokumen Kebijakan Internal',
      description: 'Koleksi dokumen kebijakan internal organisasi',
      content: 'Kumpulan dokumen kebijakan internal yang berlaku di organisasi.',
      category: 'laporan-pka',
      tags: JSON.stringify(['kebijakan', 'internal', 'organisasi']),
      is_public: false,
      author_id: admin.id,
      updated_at: new Date(),
    },
  })

  const collection3 = await prisma.collections.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Laporan PKP Angkatan I 2024',
      description: 'Laporan Pelatihan Kepemimpinan Pengawas',
      content: 'Laporan hasil pelatihan kepemimpinan pengawas angkatan I tahun 2024.',
      category: 'laporan-pkp',
      tags: JSON.stringify(['pkp', 'kepemimpinan', 'pengawas', '2024']),
      is_public: true,
      author_id: admin.id,
      updated_at: new Date(),
    },
  })

  const collection4 = await prisma.collections.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Laporan PKN Nasional 2024',
      description: 'Laporan Kepemimpinan Nasional',
      content: 'Laporan program kepemimpinan nasional tahun 2024.',
      category: 'laporan-pkn',
      tags: JSON.stringify(['pkn', 'kepemimpinan', 'nasional', '2024']),
      is_public: true,
      author_id: user.id,
      updated_at: new Date(),
    },
  })

  // Create sample limited collections
  const limitedCollection = await prisma.limited_collections.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Dokumen Rahasia Tingkat I',
      description: 'Dokumen dengan akses terbatas',
      content: 'Konten dokumen rahasia yang hanya dapat diakses oleh personel tertentu.',
      category: 'laporan-pka',
      tags: JSON.stringify(['rahasia', 'terbatas', 'khusus']),
      max_access: 50,
      current_access: 5,
      is_active: true,
      author_id: admin.id,
      updated_at: new Date(),
    },
  })

  // Create sample guestbook entries
  const guestbook1 = await prisma.guestbook_entries.create({
    data: {
      id: crypto.randomUUID(),
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Terima kasih atas layanan yang sangat baik!',
      is_approved: true,
      author_id: user.id,
      updated_at: new Date(),
    },
  })

  const guestbook2 = await prisma.guestbook_entries.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Website ini sangat membantu untuk mengakses informasi PNS.',
      is_approved: false,
      updated_at: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user: admin / admin123')
  console.log('👤 Regular user: user / user123')
  console.log(`📊 Created ${await prisma.reports.count()} reports`)
  console.log(`📚 Created ${await prisma.collections.count()} collections`)
  console.log(`🔒 Created ${await prisma.limited_collections.count()} limited collections`)
  console.log(`💬 Created ${await prisma.guestbook_entries.count()} guestbook entries`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


