import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Digital Collection Management System
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Organize, manage, and share your digital collections with ease. Our platform provides a secure and
                efficient way to handle your digital assets.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/public-collections">Browse Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24 lg:py-32">
        <PageHeader heading="Featured Collections" text="Explore our most popular digital collections" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured collections would go here */}
        </div>
      </section>
    </div>
  )
}
