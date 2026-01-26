"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface PodiumSvgProps {
  className?: string
}

export function PodiumSvg({ className = "" }: PodiumSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const glowRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !glowRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.7, y: 16, transformOrigin: "50% 100%" },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "back.out(1.8)" },
      )

      gsap.to(glowRef.current, {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="-180 -160 360 260"
      className={`w-full h-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="podiumBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="40%" stopColor="#020617" />
          <stop offset="100%" stopColor="#02040b" />
        </linearGradient>

        <linearGradient id="podiumAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>

        <radialGradient id="podiumGlow" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>

        <filter id="podiumSoftGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ground glow */}
      <ellipse
        cx="0"
        cy="82"
        rx="110"
        ry="24"
        fill="#22c55e"
        opacity="0.25"
        filter="blur(12px)"
      />

      <g ref={glowRef} filter="url(#podiumSoftGlow)">
        {/* background aura */}
        <ellipse cx="0" cy="-40" rx="140" ry="90" fill="url(#podiumGlow)" />

        {/* center podium (judges) */}
        <g>
          <rect
            x="-55"
            y="-10"
            width="110"
            height="70"
            rx="10"
            fill="url(#podiumBaseGrad)"
          />
          <rect
            x="-55"
            y="-10"
            width="110"
            height="10"
            rx="10"
            fill="url(#podiumAccentGrad)"
          />
          <ellipse cx="0" cy="-10" rx="55" ry="8" fill="#020617" opacity="0.9" />
          <ellipse
            cx="0"
            cy="-12"
            rx="45"
            ry="6"
            fill="#16a34a"
            opacity="0.6"
          />
          {/* small star on front */}
          <polygon
            points="0,-2 4,4 11,4 5,8 7,14 0,10 -7,14 -5,8 -11,4 -4,4"
            fill="#a7f3d0"
          />
        </g>

        {/* left block */}
        <g opacity="0.9">
          <rect
            x="-105"
            y="5"
            width="60"
            height="55"
            rx="8"
            fill="url(#podiumBaseGrad)"
          />
          <rect
            x="-105"
            y="5"
            width="60"
            height="8"
            rx="8"
            fill="#1f2937"
          />
          <ellipse
            cx="-75"
            cy="5"
            rx="30"
            ry="5.5"
            fill="#020617"
            opacity="0.9"
          />
        </g>

        {/* right block */}
        <g opacity="0.9">
          <rect
            x="45"
            y="12"
            width="60"
            height="48"
            rx="8"
            fill="url(#podiumBaseGrad)"
          />
          <rect
            x="45"
            y="12"
            width="60"
            height="8"
            rx="8"
            fill="#1f2937"
          />
          <ellipse cx="75" cy="12" rx="30" ry="5.5" fill="#020617" opacity="0.9" />
        </g>

        {/* microphone + panel */}
        <g>
          <rect
            x="-30"
            y="-60"
            width="60"
            height="25"
            rx="6"
            fill="#020617"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <text
            x="0"
            y="-43"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#bbf7d0"
            fontSize="10"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            JUDGES
          </text>

          {/* mic stand */}
          <line
            x1="0"
            y1="-60"
            x2="0"
            y2="-75"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="0" cy="-78" r="5" fill="#22c55e" />
          <circle cx="0" cy="-78" r="3" fill="#bbf7d0" />
        </g>
      </g>
    </svg>
  )
}
