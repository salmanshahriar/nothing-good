"use client"

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>

          {/* Animated arc */}
          <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
        </div>
        <div className="mt-6 text-white text-lg font-light tracking-wider">Loading project...</div>
      </div>
    </div>
  )
}
