import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio Work",
  description: "View our client projects",
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
