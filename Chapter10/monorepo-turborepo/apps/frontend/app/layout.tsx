import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Monorepo Frontend",
  description: "Example Next.js app using shared packages"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <div className="min-h-screen">
          <header className="border-b border-slate-800 bg-slate-900/50">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
              <h1 className="text-lg font-semibold">Monorepo Demo</h1>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
