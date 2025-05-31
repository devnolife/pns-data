import Link from "next/link"
import { Logo } from "@/components/common/logo"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Relasi CPNS</span>
            </div>
            <p className="text-sm text-gray-600">
              Platform digital untuk mencari referensi dan menghubungkan calon pegawai negeri sipil dengan
              sumber daya yang berkualitas.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/public-collections" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Koleksi Publik
                </Link>
              </li>
              <li>
                <Link href="/guestbook" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Buku Tamu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Akun</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Masuk
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-purple-100 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Relasi CPNS. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
