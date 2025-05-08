"use client"

import { useEffect, useRef } from "react"

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

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const particlesRef = useRef<Particle[]>([])
  const scaleRef = useRef(1)
  const scoreRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

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
      const LARGE_PIXEL_SIZE = 8 * scale
      const SMALL_PIXEL_SIZE = 4 * scale
      const BALL_SPEED = 6 * scale

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
        radius: adjustedLargePixelSize * BALL_SIZE_FACTOR,
      }

      // Initialize empty particles array
      particlesRef.current = []
      // Reset score
      scoreRef.current = 0

      const paddleWidth = adjustedLargePixelSize
      const paddleLength = 10 * adjustedLargePixelSize

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
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
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
    <div ref={containerRef} className="w-full h-[100vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-10"></div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Salman Shahriar: Frontend Developer - Interactive Portfolio"
      />
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white text-black">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  Frontend Development
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  System Design/Architecture
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  DevOps
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  AI Agent Development
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  <a
                    href="https://linkedin.com/in/salman-shahriar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn /salman-shahriar
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  <a
                    href="https://github.com/salmanshahriar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub /salmanshahriar
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  <a
                    href="https://instagram.com/thatlazysalman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram /thatlazysalman
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                  <a
                    href="https://facebook.com/salmanshahriar.67"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Facebook /salmanshahriar.67
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-lg mb-6">
              Hi, I'm Salman Shahriar. A Co-Founder of a designing agency and a Frontend Developer with 3.5 years of
              experience.
            </p>

            <p className="text-lg mb-6">
              I specialize in building high-performance web applications, learning management systems (LMS), and
              AI-driven SaaS products using modern web technologies.
            </p>

            <p className="text-lg mb-6">
              As the Co-Founder of InnovPixel, I lead a designing agency specializing in top-tier graphic design and
              social media marketing solutions. Our team crafts eye-catching visuals, including logos, social media
              banners, and promotional ads that help brands stand out and connect with their audience.
            </p>

            <p className="text-lg mb-6">
              I'm passionate about innovation and creating new things that don't exist. I use my skills to build
              projects that inspire, solve problems, and make a positive impact.
            </p>

            <div className="mt-8">
              <a
                href="https://linkedin.com/in/salman-shahriar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Let's Connect On LinkedIn{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PromptingIsAllYouNeed() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
    </main>
  )
}

export default PromptingIsAllYouNeed
