import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import AuthSessionProvider from "./providers/authsessionProvider"
import { Toaster } from "@/components/ui/toaster"
import { TanstackProvider } from "./providers/tanstackProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Recipe Master",
  description: "A comprehensive app for all your recipe needs",
  authors: [{ name: "Khaled Hammami", url: "https://khaledhm.tn" }],
  keywords: "Recipe, Cooking, Chef, Food, Next.js, React, TypeScript",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TanstackProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  )
}
