"use client"

import { useMobile } from "@/hooks/use-mobile"

export function AboutSection() {
  const isMobile = useMobile()

  return (
    <section id="about" className="h-full w-full overflow-hidden bg-white text-black flex flex-col justify-center">
      <div className="container mx-auto px-5 md:px-8 max-w-5xl py-6 md:py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10">
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
            <div className="rounded-xl">
              <h3 className="text-lg lg:text-2xl font-semibold mb-2 flex items-center">
                <span className="w-1.5 h-6 bg-black rounded-full mr-2.5 hidden lg:block"></span>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">Frontend Development</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">System Design</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">DevOps</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">AI Development</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">Agentic AI Development</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-sm">Hackathons</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 mt-0">
            <div className="space-y-2 md:space-y-4">
              <p className="text-sm md:text-lg">
                Hi, I'm <span className="font-semibold">Salman Shahriar</span>. A Co-Founder of a design agency and a
                Frontend Developer with 3.5 years of experience.
              </p>

              <p className="text-sm md:text-lg">
                I specialize in building high-performance web applications, learning management systems (LMS), and
                AI-driven SaaS products using modern web technologies like React, Next.js, and TypeScript.
              </p>

              <p className="text-sm md:text-lg">
                As the Co-Founder of{" "}
                <a
                  href="https://www.linkedin.com/company/innovpixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-blue-600 transition-colors"
                  aria-label="InnovPixel LinkedIn Page"
                >
                  InnovPixel
                </a>
                , I lead a design agency specializing in top-tier graphic design and social media marketing. We craft
                logos, banners, and visuals that help brands stand out and connect.
              </p>

              <p className="text-sm md:text-lg">
                I'm passionate about meaningful innovation and bringing ideas to life. I work on projects that inspire
                me, solve real problems, and create a positive impact. (Currently diving into Agentic AI development and
                DevOps.)
              </p>

              <p className="text-sm md:text-lg">
                Let's connect to explore how my expertise in web development, along with my design agency InnovPixel's
                creative design services, can bring your next project or brand to life!
              </p>
            </div>

            <div className="lg:hidden mt-4">
              <h3 className="text-lg font-semibold mb-2">Interests</h3>
              <p className="text-xs">
                Frontend Development, System Design, DevOps, AI Development, Agentic AI Development, Hackathons
              </p>
            </div>

            <div className="mt-4 md:mt-8 flex justify-center lg:justify-end">
              <a
                href="https://linkedin.com/in/salman-shahriar"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-block bg-black text-white py-2 px-4 md:py-3 md:px-6 rounded-md text-sm md:text-base font-medium hover:bg-gray-800 transition-colors active:bg-gray-900 active:scale-[0.98] transform"
                aria-label="Connect with Salman Shahriar on LinkedIn"
              >
                Let's Connect On LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
