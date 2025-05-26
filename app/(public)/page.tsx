import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users, BarChart3, Shield, Search, Upload, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { FeatureCard } from "@/components/common/feature-card"
import { TestimonialCard } from "@/components/common/testimonial-card"
import { StatsCard } from "@/components/common/stats-card"

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative -mt-10 overflow-hidden py-20 md:py-24 lg:py-32">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  Sistem Manajemen Koleksi Digital
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Kelola, atur, dan bagikan koleksi digital Anda dengan mudah. Platform kami menyediakan cara yang aman
                  dan efisien untuk mengelola aset digital Anda.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-1">
                  <Link href="/register">
                    Mulai Sekarang <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/public-collections">Jelajahi Koleksi</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-lg shadow-xl lg:mx-0">
              <Image
                src="/images/hero-library.png"
                alt="Perpustakaan Digital Modern"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-16 lg:py-20">
        <PageHeader
          heading="Fitur Utama"
          subheading="Jelajahi kemampuan platform manajemen koleksi digital kami"
          className="text-center"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={BookOpen}
            title="Manajemen Koleksi"
            description="Kelola semua koleksi digital Anda dalam satu platform terpadu yang mudah digunakan."
          />
          <FeatureCard
            icon={Search}
            title="Pencarian Cepat"
            description="Temukan konten dengan cepat menggunakan fitur pencarian dan filter yang canggih."
          />
          <FeatureCard
            icon={Upload}
            title="Unggah Mudah"
            description="Unggah dan kategorikan dokumen digital Anda dengan beberapa klik saja."
          />
          <FeatureCard
            icon={Users}
            title="Berbagi Koleksi"
            description="Bagikan koleksi Anda dengan pengguna lain atau buat koleksi publik."
          />
          <FeatureCard
            icon={BarChart3}
            title="Statistik & Analitik"
            description="Dapatkan wawasan tentang koleksi Anda dengan laporan dan statistik terperinci."
          />
          <FeatureCard
            icon={Shield}
            title="Keamanan Terjamin"
            description="Lindungi koleksi digital Anda dengan sistem keamanan tingkat tinggi."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container">
          <PageHeader
            heading="Dipercaya oleh Banyak Pengguna"
            subheading="Bergabunglah dengan ribuan pengguna yang telah mempercayakan koleksi digital mereka pada kami"
            className="text-center"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatsCard value="10,000+" label="Pengguna Aktif" />
            <StatsCard value="500,000+" label="Dokumen Dikelola" />
            <StatsCard value="2,500+" label="Koleksi Publik" />
            <StatsCard value="99.9%" label="Waktu Aktif" />
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Siap untuk Mengelola Koleksi Digital Anda?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Daftar sekarang dan mulai kelola koleksi digital Anda dengan mudah, aman, dan efisien.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-1">
                <Link href="/register">
                  Daftar Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/public-collections">Jelajahi Koleksi Publik</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
