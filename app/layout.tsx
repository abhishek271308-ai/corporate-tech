import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: site.title,
    template: "%s | Nexora",
  },

  description: site.description,

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },

  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/opengraph-image",
        alt: "Nexora — Digital Product Engineering",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:p-3 focus:text-white"
            >
              Skip to content
            </a>

            <Navbar />

            <main id="main-content" tabIndex={-1} className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>

        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      </body>
    </html>
  );
}
