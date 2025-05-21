export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Digital Collection Management System. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
