import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@pnsdata.com',
      password: adminPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      email: 'user@pnsdata.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER',
    },
  })

  // Create sample reports
  const report1 = await prisma.report.create({
    data: {
      title: 'Laporan Kinerja Q1 2024',
      description: 'Laporan kinerja triwulan pertama tahun 2024',
      content: 'Ini adalah konten laporan kinerja untuk Q1 2024. Mencakup berbagai aspek kinerja organisasi.',
      category: 'Kinerja',
      priority: 'HIGH',
      status: 'COMPLETED',
      authorId: admin.id,
      assigneeId: user.id,
    },
  })

  const report2 = await prisma.report.create({
    data: {
      title: 'Laporan Keuangan Bulanan',
      description: 'Laporan keuangan untuk bulan ini',
      content: 'Detail laporan keuangan mencakup pemasukan, pengeluaran, dan analisis budget.',
      category: 'Keuangan',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      authorId: user.id,
    },
  })

  // Create sample collections
  const collection1 = await prisma.collection.create({
    data: {
      title: 'Panduan Administrasi PNS',
      description: 'Kumpulan panduan administrasi untuk PNS',
      content: 'Panduan lengkap mengenai administrasi PNS, termasuk prosedur, formulir, dan kebijakan terbaru.',
      category: 'Administrasi',
      tags: JSON.stringify(['panduan', 'administrasi', 'pns', 'prosedur']),
      isPublic: true,
      authorId: admin.id,
    },
  })

  const collection2 = await prisma.collection.create({
    data: {
      title: 'Dokumen Kebijakan Internal',
      description: 'Koleksi dokumen kebijakan internal organisasi',
      content: 'Kumpulan dokumen kebijakan internal yang berlaku di organisasi.',
      category: 'Kebijakan',
      tags: JSON.stringify(['kebijakan', 'internal', 'organisasi']),
      isPublic: false,
      authorId: admin.id,
    },
  })

  // Create sample limited collections
  const limitedCollection = await prisma.limitedCollection.create({
    data: {
    title: 'Dokumen Rahasia Tingkat I',
      description: 'Dokumen dengan akses terbatas',
      content: 'Konten dokumen rahasia yang hanya dapat diakses oleh personel tertentu.',
      category: 'Rahasia',
      tags: JSON.stringify(['rahasia', 'terbatas', 'khusus']),
      maxAccess: 50,
      currentAccess: 5,
      isActive: true,
      authorId: admin.id,
    },
  })

  // Create sample guestbook entries
  const guestbook1 = await prisma.guestbookEntry.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Terima kasih atas layanan yang sangat baik!',
      isApproved: true,
      authorId: user.id,
    },
  })

  const guestbook2 = await prisma.guestbookEntry.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Website ini sangat membantu untuk mengakses informasi PNS.',
      isApproved: false,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user: admin / admin123')
  console.log('👤 Regular user: user / user123')
  console.log(`📊 Created ${await prisma.report.count()} reports`)
  console.log(`📚 Created ${await prisma.collection.count()} collections`)
  console.log(`🔒 Created ${await prisma.limitedCollection.count()} limited collections`)
  console.log(`💬 Created ${await prisma.guestbookEntry.count()} guestbook entries`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
