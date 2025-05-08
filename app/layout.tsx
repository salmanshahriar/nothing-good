import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Salman Shahriar | Frontend Developer & Co-Founder of InnovPixel",
  description:
    "Salman Shahriar is a Frontend Developer with 3.5+ years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products. Co-Founder of InnovPixel design agency.",
  keywords: [
    "Salman Shahriar",
    "Frontend Developer",
    "Web Development",
    "InnovPixel",
    "React",
    "Next.js",
    "UI/UX",
    "JavaScript",
    "TypeScript",
    "SaaS",
    "LMS",
    "Chattogram",
    "Bangladesh",
    "Frontend Engineer",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Salman Shahriar", url: "https://linkedin.com/in/salman-shahriar" }],
  creator: "Salman Shahriar",
  publisher: "Salman Shahriar",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://www.salmanshahriar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Salman Shahriar | Frontend Developer & Co-Founder of InnovPixel",
    description:
      "Salman Shahriar is a Frontend Developer with 3.5+ years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products. Co-Founder of InnovPixel design agency.",
    siteName: "Salman Shahriar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salman Shahriar - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Shahriar | Frontend Developer & Co-Founder of InnovPixel",
    description:
      "Salman Shahriar is a Frontend Developer with 3.5+ years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products.",
    creator: "@salmanshahriar",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Salman Shahriar",
              url: "https://www.salmanshahriar.com",
              jobTitle: "Frontend Developer",
              worksFor: {
                "@type": "Organization",
                name: "InnovPixel",
                url: "https://www.linkedin.com/company/innovpixel",
              },
              sameAs: [
                "https://linkedin.com/in/salman-shahriar",
                "https://github.com/salmanshahriar",
                "https://instagram.com/thatlazysalman",
                "https://facebook.com/salmanshahriar.67",
                "https://discord.com/users/758028044861571140",
              ],
              knowsAbout: [
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Web Development",
                "UI/UX Design",
                "System Design",
                "DevOps",
                "AI Development",
                "Agentic AI Development",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chattogram",
                addressCountry: "Bangladesh",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
