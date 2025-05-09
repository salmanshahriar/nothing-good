"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { getViewportHeight } from "@/components/utils"

export function PromptingIsAllYouNeed() {
  const [viewportHeight, setViewportHeight] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(getViewportHeight())
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
    }

    updateViewportHeight()
    window.addEventListener("resize", updateViewportHeight)
    window.addEventListener("orientationchange", () => {
      setTimeout(updateViewportHeight, 100)
    })

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
      window.removeEventListener("orientationchange", updateViewportHeight)
    }
  }, [])

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".snap-container")
      if (!container) return

      const scrollTop = container.scrollTop
      const heroSection = document.getElementById("hero-section")
      const aboutSection = document.getElementById("about-section")
      const contactSection = document.getElementById("contact-section")

      if (!heroSection || !aboutSection || !contactSection) return

      const heroHeight = heroSection.offsetHeight
      const aboutHeight = aboutSection.offsetHeight

      if (scrollTop < heroHeight / 2) {
        setActiveSection("hero")
      } else if (scrollTop < heroHeight + aboutHeight / 2) {
        setActiveSection("about")
      } else {
        setActiveSection("contact")
      }
    }

    const container = document.querySelector(".snap-container")
    if (container) {
      container.addEventListener("scroll", handleScroll)

      // Initial check
      handleScroll()

      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <main className="h-screen w-full">
      <div className="snap-container hide-scrollbar">
        <section className="snap-section overflow-y-hidden" id="hero-section" data-section="hero">
          <HeroSection />
        </section>
        <section className="snap-section overflow-y-hidden" id="about-section" data-section="about">
          <AboutSection />
        </section>
        <section className="snap-section overflow-y-hidden" id="contact-section" data-section="contact">
          <ContactSection />
        </section>
      </div>

      {/* Navigation dots for section indication */}
      <nav className="fixed z-50 right-6 bottom-16 md:right-8 md:bottom-16" aria-label="Section navigation">
        <ul className="flex flex-col space-y-3 md:space-y-4">
          <li>
            <button
              onClick={() => {
                const container = document.querySelector(".snap-container")
                if (container) {
                  container.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              }}
              className={`block w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                activeSection === "hero"
                  ? "bg-white scale-110 md:scale-125 border-white"
                  : activeSection === "about"
                    ? "bg-transparent border border-black"
                    : "bg-transparent border border-white"
              }`}
              aria-label="Go to Hero section"
              aria-current={activeSection === "hero" ? "true" : "false"}
            />
          </li>
          <li>
            <button
              onClick={() => {
                const container = document.querySelector(".snap-container")
                const aboutSection = document.getElementById("about-section")
                if (container && aboutSection) {
                  container.scrollTo({
                    top: aboutSection.offsetTop,
                    behavior: "smooth",
                  })
                }
              }}
              className={`block w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                activeSection === "about"
                  ? "bg-black scale-110 md:scale-125 border-black"
                  : activeSection === "hero"
                    ? "bg-transparent border border-white"
                    : "bg-transparent border border-white"
              }`}
              aria-label="Go to About section"
              aria-current={activeSection === "about" ? "true" : "false"}
            />
          </li>
          <li>
            <button
              onClick={() => {
                const container = document.querySelector(".snap-container")
                const contactSection = document.getElementById("contact-section")
                if (container && contactSection) {
                  container.scrollTo({
                    top: contactSection.offsetTop,
                    behavior: "smooth",
                  })
                }
              }}
              className={`block w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                activeSection === "contact"
                  ? "bg-white scale-110 md:scale-125 border-white"
                  : activeSection === "about"
                    ? "bg-transparent border border-black"
                    : "bg-transparent border border-white"
              }`}
              aria-label="Go to Contact section"
              aria-current={activeSection === "contact" ? "true" : "false"}
            />
          </li>
        </ul>
      </nav>

      {/* Skip to content link for accessibility */}
      <a
        href="#about-section"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50"
      >
        Skip to content
      </a>
    </main>
  )
}

export default PromptingIsAllYouNeed
