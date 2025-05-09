"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import LoadingSpinner from "./loading-spinner"

interface ImageLightboxProps {
  images: string[]
  titleColor: string
  imagePadding: number
}

export default function ImageLightbox({ images, titleColor, imagePadding }: ImageLightboxProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    // Start loading
    setIsLoading(true)

    // Set a loading time of 1.5 seconds - this gives a consistent experience
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [images])

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="flex flex-col">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full cursor-pointer"
            style={{ marginBottom: index < images.length - 1 ? `${imagePadding}px` : 0 }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Project image ${index + 1}`}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority={index < 2} // Prioritize loading the first two images
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-7xl w-[95vw] p-0 bg-transparent border-none">
          {selectedImageIndex !== null && (
            <div className="relative aspect-auto max-h-[95vh] w-full flex items-center justify-center">
              <Image
                src={images[selectedImageIndex] || "/placeholder.svg"}
                alt={`Project image ${selectedImageIndex + 1}`}
                width={1920}
                height={1080}
                className="object-contain max-h-[90vh]"
              />

              <button
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                onClick={closeLightbox}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                onClick={goToPrevious}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                onClick={goToNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full"
                style={{ color: titleColor }}
              >
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
