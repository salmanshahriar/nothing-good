"use client"

import { useState } from "react"
import Image from "next/image"
import type { ProjectImage } from "@/config/projects"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProjectPresentationProps {
  images: ProjectImage[]
}

export default function ProjectPresentation({ images }: ProjectPresentationProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)

  if (images.length === 0) {
    return <div className="text-center py-12 text-gray-500">No images available for this project</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-[16/9] w-full">
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-[90vw] p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative aspect-auto max-h-[90vh] w-full flex items-center justify-center">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="object-contain max-h-[90vh]"
              />

              <button
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                onClick={() => setSelectedImage(null)}
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
