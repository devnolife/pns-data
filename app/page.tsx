import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/common/footer"
import { BookCopy, FileText, Users, Search, Shield, BarChart4, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-pattern" />
          <div className="container relative z-10 flex flex-col items-center justify-center gap-8 py-20 text-center md:py-32">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Digital Collection <span className="text-primary">Management System</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                A modern platform for organizing, sharing, and preserving digital collections and reports.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/public-collections">
                <Button size="lg" variant="outline" className="gap-2">
                  Browse Collections <Search className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 w-full max-w-5xl overflow-hidden rounded-lg border bg-card/50 shadow-soft backdrop-blur-sm">
              <Image
                src="/digital-library-dashboard.png"
                alt="Digital Collection Management System Dashboard"
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features for Digital Collections</h2>
              <p className="text-muted-foreground">
                Our platform provides everything you need to manage your digital assets efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <BookCopy className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Digital Collections</h3>
                <p className="text-muted-foreground">
                  Organize and categorize your digital assets with customizable collections
                </p>
              </div>

              {/* Feature 2 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Report Management</h3>
                <p className="text-muted-foreground">
                  Upload, verify, and manage reports with our streamlined workflow
                </p>
              </div>

              {/* Feature 3 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">User Collaboration</h3>
                <p className="text-muted-foreground">
                  Enable seamless collaboration between users with different roles and permissions
                </p>
              </div>

              {/* Feature 4 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Find exactly what you need with powerful search and filtering capabilities
                </p>
              </div>

              {/* Feature 5 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Secure Access</h3>
                <p className="text-muted-foreground">Control access to your collections with role-based permissions</p>
              </div>

              {/* Feature 6 */}
              <div className="dashboard-card group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <BarChart4 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Analytics</h3>
                <p className="text-muted-foreground">
                  Gain insights into collection usage with detailed analytics and reports
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center justify-between gap-8 rounded-lg border bg-card p-8 shadow-soft md:flex-row md:p-12">
              <div className="max-w-[600px] space-y-4">
                <h2 className="text-3xl font-bold md:text-4xl">Ready to get started?</h2>
                <p className="text-muted-foreground">
                  Join thousands of users who are already managing their digital collections with our platform.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Sign Up Now <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
