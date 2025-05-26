import Link from "next/link"
import { Logo } from "@/components/common/logo"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold">SMKD</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistem Manajemen Koleksi Digital yang aman, efisien, dan mudah digunakan untuk semua kebutuhan pengelolaan
              aset digital Anda.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/public-collections" className="text-muted-foreground hover:text-foreground">
                  Koleksi Publik
                </Link>
              </li>
              <li>
                <Link href="/guestbook" className="text-muted-foreground hover:text-foreground">
                  Buku Tamu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Akun</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">
                  Masuk
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-foreground">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sistem Manajemen Koleksi Digital. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
