"use client"

import { useEffect, useRef } from "react"

const COLOR = "#FFFFFF" // Text color - keeping white
const HIT_COLOR = "#9CA3AF" // Changed to gray from purple
const BACKGROUND_COLOR = "#0A0A0A" // Premium black background
const PADDLE_COLOR = "#6B7280" // Changed to darker gray from purple
const LETTER_SPACING = 1
const WORD_SPACING = 3
const BALL_SIZE_FACTOR = 4.0 // Increased from 2.5 to make the ball much bigger
const PARTICLE_COUNT = 8 // Number of particles when hitting pixels
const PARTICLE_LIFETIME = 30 // How long particles last in frames
const ROTATION_SPEED = 0.15 // Reduced from 0.2 for smoother rotation
const HIT_IMAGE_DURATION = 15 // How long to show the hit image in frames

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
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
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
  rotation: number
  rotationSpeed: number
  isHit: boolean
  hitTimer: number
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

// Add a new TextParticle interface after the Particle interface
interface TextParticle {
  x: number
  y: number
  dx: number
  dy: number
  text: string
  color: string
  life: number
  maxLife: number
  size: number
  rotation: number
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    radius: 0,
    rotation: 0,
    rotationSpeed: 0,
    isHit: false,
    hitTimer: 0,
  })
  const paddlesRef = useRef<Paddle[]>([])
  const particlesRef = useRef<Particle[]>([])
  // Add textParticlesRef after particlesRef
  const textParticlesRef = useRef<TextParticle[]>([])
  const scaleRef = useRef(1)
  const scoreRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const ballImageRef = useRef<HTMLImageElement | null>(null)
  const ballHitImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Load the normal ball image
    const ballImage = new Image()
    ballImage.src =
      "https://media.discordapp.net/attachments/1340743900742287463/1370103947582509126/Picsart_25-05-09_00-23-33-215.png?ex=681e483c&is=681cf6bc&hm=ed791a2d041311af609ae26bdcb42535a5c6402f1ed9a141867156d363d010ab&=&format=webp&quality=lossless&width=1164&height=1462"
    ballImage.crossOrigin = "anonymous"
    ballImage.onload = () => {
      ballImageRef.current = ballImage
    }

    // Load the hit ball image
    const ballHitImage = new Image()
    ballHitImage.src =
      "https://media.discordapp.net/attachments/1340743900742287463/1370121320091619388/Picsart_25-05-09_00-23-33-215.png?ex=681e586a&is=681d06ea&hm=72b2d620c1bb4a8c048975bd1a90c8c1e06617458796eef264b330ff2797c8e1&=&format=webp&quality=lossless&width=1164&height=1462"
    ballHitImage.crossOrigin = "anonymous"
    ballHitImage.onload = () => {
      ballHitImageRef.current = ballHitImage
    }

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
      const BALL_SPEED = 4 * scale // Reduced from 6 to slow down the game

      pixelsRef.current = []
      // Check the words array to ensure "DEVELOPER" is spelled correctly
      const words = [["ALSAAD", "HATER"], "DHON ER VFX BANAO MIA"]

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
        rotation: 0,
        rotationSpeed: 0,
        isHit: false,
        hitTimer: 0,
      }

      // Initialize empty particles array
      particlesRef.current = []
      // Add this line after initializing particlesRef.current = []
      textParticlesRef.current = []
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

    // Add a new function to create text particles after the createParticles function
    const createTextParticles = (x: number, y: number) => {
      const text = "gok"
      const colors = ["#FFFFFF", "#E5E7EB", "#9CA3AF", "#D1D5DB"]

      // Create multiple text particles in different directions
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        textParticlesRef.current.push({
          x: x,
          y: y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          text: text,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 60, // Longer life than regular particles
          maxLife: 60,
          size: Math.random() * 16 + 12, // Random size between 12-28px
          rotation: Math.random() * Math.PI * 2, // Random initial rotation
        })
      }
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      // Update hit timer if ball is in hit state
      if (ball.isHit) {
        ball.hitTimer--
        if (ball.hitTimer <= 0) {
          ball.isHit = false
        }
      }

      ball.x += ball.dx
      ball.y += ball.dy

      // Update rotation based on current rotation speed
      ball.rotation += ball.rotationSpeed

      // Gradually slow down rotation
      ball.rotationSpeed *= 0.98

      // Wall collisions
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
        // Add rotation on wall hit
        ball.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * ROTATION_SPEED
        // Set ball to hit state
        ball.isHit = true
        ball.hitTimer = HIT_IMAGE_DURATION
        // After setting ball.isHit = true and ball.hitTimer = HIT_IMAGE_DURATION, add:
        createTextParticles(ball.x, ball.y)
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
        // Add rotation on wall hit
        ball.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * ROTATION_SPEED
        // Set ball to hit state
        ball.isHit = true
        ball.hitTimer = HIT_IMAGE_DURATION
        // After setting ball.isHit = true and ball.hitTimer = HIT_IMAGE_DURATION, add:
        createTextParticles(ball.x, ball.y)
      }

      // Paddle collisions
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
            // Add rotation on paddle hit
            ball.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * ROTATION_SPEED
            // Set ball to hit state
            ball.isHit = true
            ball.hitTimer = HIT_IMAGE_DURATION
            // After setting ball.isHit = true and ball.hitTimer = HIT_IMAGE_DURATION, add:
            createTextParticles(ball.x, ball.y)
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
            // Add rotation on paddle hit
            ball.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * ROTATION_SPEED
            // Set ball to hit state
            ball.isHit = true
            ball.hitTimer = HIT_IMAGE_DURATION
            // After setting ball.isHit = true and ball.hitTimer = HIT_IMAGE_DURATION, add:
            createTextParticles(ball.x, ball.y)
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

      // Add text particle update logic in the updateGame function
      // After the particle update section, add:
      textParticlesRef.current = textParticlesRef.current.filter((particle) => {
        particle.x += particle.dx
        particle.y += particle.dy
        particle.life--
        // Slow down movement over time
        particle.dx *= 0.98
        particle.dy *= 0.98
        // Add some gravity effect
        particle.dy += 0.05
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

          // Add rotation on pixel hit
          ball.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * ROTATION_SPEED * 1.5

          // Set ball to hit state
          ball.isHit = true
          ball.hitTimer = HIT_IMAGE_DURATION

          // After setting ball.isHit = true and ball.hitTimer = HIT_IMAGE_DURATION, add:
          createTextParticles(pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)

          // Add a small random factor to avoid predictable patterns
          ball.dx *= 1 + (Math.random() * 0.1 - 0.05)
          ball.dy *= 1 + (Math.random() * 0.1 - 0.05)

          // Ensure the ball maintains a reasonable speed
          const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)
          const targetSpeed = 4 * scaleRef.current
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

      // Add text particle drawing in the drawGame function
      // After drawing regular particles and before drawing the ball, add:
      // Draw text particles
      textParticlesRef.current.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.life / particle.maxLife
        ctx.fillStyle = particle.color
        ctx.font = `bold ${particle.size}px Arial`
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.fillText(particle.text, 0, 0)
        ctx.restore()
      })

      // Draw ball image with rotation
      const ball = ballRef.current
      const radius = ball.radius
      const diameter = radius * 2

      // Choose which image to display based on hit state
      const currentBallImage = ball.isHit && ballHitImageRef.current ? ballHitImageRef.current : ballImageRef.current

      if (currentBallImage) {
        // Save the current context state
        ctx.save()

        // Draw black circular background for the ball
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Set blending mode for transparency
        ctx.globalCompositeOperation = "source-over"

        // Translate to the ball's center position
        ctx.translate(ball.x, ball.y)

        // Apply rotation
        ctx.rotate(ball.rotation)

        // Draw the image centered at the origin (0,0) which is now the ball's center
        ctx.drawImage(currentBallImage, -radius, -radius, diameter, diameter)

        // Restore the context to its original state
        ctx.restore()
      } else {
        // Fallback to circle if image isn't loaded yet
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

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

export function PromptingIsAllYouNeed() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}

export default PromptingIsAllYouNeed
