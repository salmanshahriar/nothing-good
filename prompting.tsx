"use client"

import { useEffect, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

const COLOR = "#FFFFFF" // Text color - keeping white
const HIT_COLOR = "#9CA3AF" // Changed to gray from purple
const BACKGROUND_COLOR = "#0A0A0A" // Premium black background
const BALL_COLOR = "#FFFFFF" // Ball color - keeping white
const PADDLE_COLOR = "#6B7280" // Changed to darker gray from purple
const LETTER_SPACING = 1
const WORD_SPACING = 3
const BALL_SIZE_FACTOR = 1.5 // Controls how big the ball is
const PARTICLE_COUNT = 8 // Number of particles when hitting pixels
const PARTICLE_LIFETIME = 30 // How long particles last in frames

const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

interface Particle {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string
  life: number
  maxLife: number
}

// Function to get the actual viewport height (fixes iOS Safari issues)
function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const particlesRef = useRef<Particle[]>([])
  const scaleRef = useRef(1)
  const scoreRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [viewportHeight, setViewportHeight] = useState(0)

  // Set initial viewport height and update on resize
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(getViewportHeight())
      // Apply the height to document root for consistent vh units
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
    }

    // Initial update
    updateViewportHeight()

    // Update on resize
    window.addEventListener("resize", updateViewportHeight)

    // Update on orientation change for mobile devices
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure the browser has updated dimensions after orientation change
      setTimeout(updateViewportHeight, 100)
    })

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
      window.removeEventListener("orientationchange", updateViewportHeight)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const containerRect = container.getBoundingClientRect()
      canvas.width = containerRect.width
      canvas.height = containerRect.height
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame()
    }

    const initializeGame = () => {
      const scale = scaleRef.current
      // Adjust pixel sizes for mobile
      const LARGE_PIXEL_SIZE = isMobile ? 6 * scale : 8 * scale
      const SMALL_PIXEL_SIZE = isMobile ? 3 * scale : 4 * scale
      // Adjust ball speed for mobile - slightly slower for better control
      const BALL_SPEED = isMobile ? 4.5 * scale : 6 * scale

      pixelsRef.current = []
      // Check the words array to ensure "DEVELOPER" is spelled correctly
      const words = [["SALMAN", "SHAHRIAR"], "FRONTEND DEVELOPER"]

      const calculateWordWidth = (word: string | string[], pixelSize: number) => {
        if (Array.isArray(word)) {
          return word.reduce((totalWidth, part, index) => {
            const partWidth =
              part.split("").reduce((width, letter) => {
                const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
                return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
              }, 0) -
              LETTER_SPACING * pixelSize

            // Add extra space between parts except after the last part
            const extraSpace = index < word.length - 1 ? WORD_SPACING * 2 * pixelSize : 0

            return totalWidth + partWidth + extraSpace
          }, 0)
        }

        return (
          word.split("").reduce((width, letter) => {
            const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }

      const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
      const totalWidthSmall = words[1].split(" ").reduce((width, word, index) => {
        return width + calculateWordWidth(word, SMALL_PIXEL_SIZE) + (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
      }, 0)
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall)
      const scaleFactor = (canvas.width * 0.8) / totalWidth

      const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
      const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

      const largeTextHeight = 5 * adjustedLargePixelSize
      const smallTextHeight = 5 * adjustedSmallPixelSize
      const spaceBetweenLines = 5 * adjustedLargePixelSize
      const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight

      let startY = (canvas.height - totalTextHeight) / 2

      words.forEach((word, wordIndex) => {
        const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
        const totalWidth =
          wordIndex === 0
            ? calculateWordWidth(word, adjustedLargePixelSize)
            : words[1].split(" ").reduce((width, w, index) => {
                return (
                  width +
                  calculateWordWidth(w, adjustedSmallPixelSize) +
                  (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
                )
              }, 0)

        let startX = (canvas.width - totalWidth) / 2

        if (wordIndex === 1) {
          word.split(" ").forEach((subWord) => {
            subWord.split("").forEach((letter) => {
              const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
              if (!pixelMap) return

              for (let i = 0; i < pixelMap.length; i++) {
                for (let j = 0; j < pixelMap[i].length; j++) {
                  if (pixelMap[i][j]) {
                    const x = startX + j * pixelSize
                    const y = startY + i * pixelSize
                    pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                  }
                }
              }
              startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
            })
            startX += WORD_SPACING * adjustedSmallPixelSize
          })
        } else {
          if (Array.isArray(word)) {
            // Handle first name and last name with gap
            word.forEach((namePart, nameIndex) => {
              namePart.split("").forEach((letter) => {
                const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
                if (!pixelMap) return

                for (let i = 0; i < pixelMap.length; i++) {
                  for (let j = 0; j < pixelMap[i].length; j++) {
                    if (pixelMap[i][j]) {
                      const x = startX + j * pixelSize
                      const y = startY + i * pixelSize
                      pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                    }
                  }
                }
                startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
              })

              // Add extra space between first and last name
              if (nameIndex < word.length - 1) {
                startX += WORD_SPACING * 2 * adjustedLargePixelSize
              }
            })
          } else {
            word.split("").forEach((letter) => {
              const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
              if (!pixelMap) return

              for (let i = 0; i < pixelMap.length; i++) {
                for (let j = 0; j < pixelMap[i].length; j++) {
                  if (pixelMap[i][j]) {
                    const x = startX + j * pixelSize
                    const y = startY + i * pixelSize
                    pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                  }
                }
              }
              startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
            })
          }
        }
        startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0
      })

      // Initialize ball position near the top right corner
      const ballStartX = canvas.width * 0.9
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize * (isMobile ? 1.8 : BALL_SIZE_FACTOR), // Larger ball on mobile for better visibility
      }

      // Initialize empty particles array
      particlesRef.current = []
      // Reset score
      scoreRef.current = 0

      const paddleWidth = adjustedLargePixelSize
      const paddleLength = isMobile ? 12 * adjustedLargePixelSize : 10 * adjustedLargePixelSize // Longer paddles on mobile

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ]
    }

    const createParticles = (x: number, y: number) => {
      // Updated particle colors to grayscale
      const colors = ["#FFFFFF", "#E5E7EB", "#9CA3AF", "#D1D5DB"]

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 1
        particlesRef.current.push({
          x: x,
          y: y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: PARTICLE_LIFETIME,
          maxLife: PARTICLE_LIFETIME,
        })
      }
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
          }
        }
      })

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          // Faster paddle movement on mobile for better responsiveness
          paddle.y += (paddle.targetY - paddle.y) * (isMobile ? 0.15 : 0.1)
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          // Faster paddle movement on mobile for better responsiveness
          paddle.x += (paddle.targetY - paddle.x) * (isMobile ? 0.15 : 0.1)
        }
      })

      // Update particles - use filter instead of splice to avoid array modification issues
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.dx
        particle.y += particle.dy
        particle.life--
        return particle.life > 0
      })

      // Check pixel collisions
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          scoreRef.current += 10

          // Create particles at the hit location
          createParticles(pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)

          // Simpler and more stable bounce physics
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }

          // Add a small random factor to avoid predictable patterns
          ball.dx *= 1 + (Math.random() * 0.1 - 0.05)
          ball.dy *= 1 + (Math.random() * 0.1 - 0.05)

          // Ensure the ball maintains a reasonable speed
          const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)
          const targetSpeed = 6 * scaleRef.current
          const speedFactor = targetSpeed / currentSpeed
          ball.dx *= speedFactor
          ball.dy *= speedFactor
        }
      })
    }

    const drawGame = () => {
      if (!ctx) return

      // Create premium black background
      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(17, 24, 39, 0.5)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw pixels
      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.globalAlpha = particle.life / particle.maxLife
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Draw ball with a more efficient glow effect
      // First draw the glow
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius * 1.3, 0, Math.PI * 2)
      ctx.fill()

      // Then draw the ball
      ctx.fillStyle = BALL_COLOR
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw paddles
      ctx.fillStyle = PADDLE_COLOR
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    // Initial setup
    resizeCanvas()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    // Start the game loop
    gameLoop()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden"
      style={{
        height: "100%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-10"></div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Salman Shahriar: Frontend Developer - Interactive Portfolio"
      />
      {isMobile && (
        <div className="absolute bottom-8 left-0 right-0 text-center text-white py-2 px-4 mx-4 rounded-lg z-20 text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <p>Scroll to explore</p>
        </div>
      )}
    </div>
  )
}

export function AboutSection() {
  const isMobile = useMobile()

  return (
    <div className="h-full w-full overflow-auto bg-white text-black flex flex-col justify-center">
      <div className="container mx-auto px-5 md:px-8 max-w-5xl py-6 md:py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          {/* Mobile-optimized sidebar with skills */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* Interests card */}
            <div className="rounded-xl">
              <h3 className="text-lg md:text-2xl font-semibold mb-2 flex items-center">
                <span className="w-1.5 h-6 bg-black rounded-full mr-2.5 hidden md:block"></span>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">
                  Frontend Development
                </span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">System Design</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">DevOps</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">AI Development</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">
                  Agentic AI Development
                </span>
                <span className="border border-gray-300 px-2 py-0.5 rounded-md text-xs md:text-sm">Hackathons</span>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2 mt-0">
            <div className="space-y-2 md:space-y-4">
              <p className="text-sm md:text-lg">
                Hi, I'm <span className="font-semibold">Salman Shahriar</span>. A Co-Founder of a design agency and a
                Frontend Developer with 3.5 years of experience.
              </p>

              <p className="text-sm md:text-lg">
                I specialize in building high-performance web applications, learning management systems (LMS), and
                AI-driven SaaS products using modern web technologies.
              </p>

              <p className="text-sm md:text-lg">
                As the Co-Founder of{" "}
                <a
                  href="https://www.linkedin.com/company/innovpixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-blue-600 transition-colors"
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

            <div className="mt-4 md:mt-8 flex justify-center md:justify-end">
              <a
                href="https://linkedin.com/in/salman-shahriar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white py-2 px-4 md:py-3 md:px-6 rounded-md text-sm md:text-base font-medium hover:bg-gray-800 transition-colors active:bg-gray-900 active:scale-[0.98] transform"
              >
                Let's Connect On LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactSection() {
  return (
    <div className="h-full w-full overflow-auto py-6 md:py-10 bg-black text-white flex flex-col justify-center">
      <div className="container mx-auto px-5 md:px-8 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Get In Touch</h2>

        <div className="grid grid-cols-1 gap-6 md:gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Contact Information</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Feel free to reach out to me for collaboration, job opportunities, or just to say hello!
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Email</h4>
                  <a
                    href="mailto:salmanshahriar.official@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  >
                    salmanshahriar.official@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Location</h4>
                  <p className="text-gray-400 text-sm md:text-base">
                    Chattogram, Bangladesh (Remotely available on Meet/Discord){" "}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Working Hours</h4>
                  <p className="text-gray-400 text-sm md:text-base">Does a programmer sleep? :)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                <a
                  href="https://linkedin.com/in/salman-shahriar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://github.com/salmanshahriar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://instagram.com/thatlazysalman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-pink-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://facebook.com/salmanshahriar.67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-blue-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-blue-300 transition-colors">
                    Facebook
                  </span>
                </a>
                <a
                  href="https://discord.com/users/758028044861571140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-indigo-300 transition-colors">
                    Discord
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PromptingIsAllYouNeed() {
  const [viewportHeight, setViewportHeight] = useState(0)

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

  return (
    <main className="h-screen w-full">
      <div className="snap-container hide-scrollbar">
        <section className="snap-section">
          <HeroSection />
        </section>
        <section className="snap-section">
          <AboutSection />
        </section>
        <section className="snap-section">
          <ContactSection />
        </section>
      </div>
    </main>
  )
}

export default PromptingIsAllYouNeed
