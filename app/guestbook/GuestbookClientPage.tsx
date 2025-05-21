"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import { GuestbookForm } from "@/components/common/guestbook-form"
import { Footer } from "@/components/common/footer"

export default function GuestbookClientPage() {
  return (
    <>
      <section className="w-full flex items-center justify-center py-12 lg:py-24">
        <div className="container flex flex-col items-center justify-center gap-4">
          <Link href="/" className="absolute left-8 top-8 md:left-16 md:top-12">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex flex-col items-center justify-center gap-2 px-4 lg:px-0">
            <BookOpen className="h-10 w-10" />
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Guestbook
            </h1>
            <p className="max-w-[85%] sm:text-lg text-muted-foreground">
              Sign our guestbook and share your thoughts about our digital collections.
            </p>
          </div>
        </div>
      </section>
      <GuestbookForm />
      <Footer />
    </>
  )
}
