"use client"

export function SectionBridge() {
  return (
    <div className="relative h-0 pointer-events-none z-20">
      <div className="absolute -top-5 left-0 right-0 h-12 backdrop-blur-xl" />
      <div className="absolute -top-10 left-0 right-0 h-30 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
    </div>
  )
}
