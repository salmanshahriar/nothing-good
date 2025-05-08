import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Salman Shahriar | Frontend Developer",
  description:
    "Hi, I'm Salman Shahriar. A Co-Founder of InnovPixel designing agency and a Frontend Developer with 3.5 years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products.",
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
  ],
  authors: [{ name: "Salman Shahriar" }],
  creator: "Salman Shahriar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Salman Shahriar | Frontend Developer",
    description:
      "Frontend Developer with 3.5 years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products.",
    siteName: "Salman Shahriar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Shahriar | Frontend Developer",
    description:
      "Frontend Developer with 3.5 years of experience specializing in high-performance web applications, LMS, and AI-driven SaaS products.",
    creator: "@salmanshahriar",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
