import type { Metadata } from "next"
import Link from "next/link"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Chapter 2",
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/examples/user-form", label: "User Form" },
  { href: "/examples/profile-form", label: "Profile Form" },
  { href: "/examples/comments", label: "Comments" },
  { href: "/examples/multi-step-form", label: "Multi-Step" },
  { href: "/examples/products", label: "Products" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="text-lg font-semibold">
                React 19 Chapter 2
              </Link>
              <nav aria-label="Main navigation">
                <ul className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link className="transition-colors hover:text-foreground" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Analytics />
        </div>
      </body>
    </html>
  )
}
