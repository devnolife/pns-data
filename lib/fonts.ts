import { Inter, Montserrat, JetBrains_Mono } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
