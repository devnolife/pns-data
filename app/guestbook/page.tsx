import type { Metadata } from "next"
import { PageHeader } from "@/components/common/page-header"
import { GuestbookForm } from "@/components/common/guestbook-form"
import { Footer } from "@/components/common/footer"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Guest Book",
  description: "Sign our guest book and share your thoughts",
}

export default function GuestbookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container max-w-4xl py-10">
          <PageHeader heading="Guest Book" subheading="Sign our guest book and share your thoughts" />

          <div className="mb-8 rounded-lg border bg-card p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Welcome to our Digital Collection</h2>
                <p className="text-muted-foreground">
                  We appreciate your visit to our Digital Collection Management System. Please take a moment to sign our
                  guest book and share your thoughts or feedback. Your input helps us improve our services and
                  collections.
                </p>
              </div>
            </div>
          </div>

          <GuestbookForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
