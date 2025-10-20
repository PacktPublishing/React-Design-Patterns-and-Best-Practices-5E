import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { auth } from "@/auth";
import { SessionProvider } from "@/app/providers/session-provider";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth RBAC App",
  description: "Authentication and Authorization with NextAuth.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SessionProvider session={session}>
          <Navigation />
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
