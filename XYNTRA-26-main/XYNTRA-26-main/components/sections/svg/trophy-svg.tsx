"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface TrophySvgProps {
  rank: 1 | 2 | 3
  className?: string
}

export function TrophySvg({ rank, className = "" }: TrophySvgProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const glitterContainerRef = useRef<SVGGElement>(null)
  const trophyRef = useRef<SVGGElement>(null)
  const shineRef = useRef<SVGRectElement>(null)

  const colors = {
    1: {
      primary: "#FFD700",
      secondary: "#FFA500",
      dark: "#B8860B",
      darker: "#8B6914",
      shine: "#FFFACD",
      glow: "#FFD700",
    },
    2: {
      primary: "#C0C0C0",
      secondary: "#E0E0E0",
      dark: "#808080",
      darker: "#505050",
      shine: "#FFFFFF",
      glow: "#E8E8E8",
    },
    3: {
      primary: "#CD7F32",
      secondary: "#DE9A4A",
      dark: "#8B4513",
      darker: "#5D3413",
      shine: "#F4D4A0",
      glow: "#CD7F32",
    },
  }

  const c = colors[rank]

  useEffect(() => {
    if (!svgRef.current || !glitterContainerRef.current || !trophyRef.current)
      return

    const ctx = gsap.context(() => {
      // entrance
      gsap.fromTo(
        trophyRef.current,
        { scale: 0.4, opacity: 0, y: 40, transformOrigin: "center bottom" },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.8)",
        },
      )

      // float + subtle rotation
      gsap.to(trophyRef.current, {
        y: -10,
        rotation: 1.5,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center bottom",
      })

      // shine sweep
      if (shineRef.current) {
        gsap.to(shineRef.current, {
          x: 320,
          duration: 1.8,
          repeat: -1,
          repeatDelay: 2.4,
          ease: "power2.inOut",
        })
      }

      // glitter squares
      const glitterGroup = glitterContainerRef.current
      if (glitterGroup) {
        glitterGroup.innerHTML = ""
        const glitterColors = [
          c.primary,
          c.shine,
          "#FFFFFF",
          c.secondary,
          rank === 1 ? "#FFF8DC" : rank === 2 ? "#F0F0F0" : "#DEB887",
        ]

        for (let i = 0; i < 70; i++) {
          const size = gsap.utils.random(3, 10)
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          )
          rect.setAttribute("width", String(size))
          rect.setAttribute("height", String(size))
          rect.setAttribute("x", String(gsap.utils.random(-160, 160)))
          rect.setAttribute("y", String(gsap.utils.random(-220, 120)))
          rect.setAttribute("rx", "1")
          rect.setAttribute(
            "fill",
            glitterColors[Math.floor(Math.random() * glitterColors.length)],
          )
          rect.setAttribute("opacity", "0")

          glitterGroup.appendChild(rect)

          gsap.to(rect, {
            opacity: gsap.utils.random(0.4, 1),
            scale: gsap.utils.random(0.6, 1.6),
            rotation: gsap.utils.random(-45, 45),
            duration: gsap.utils.random(0.35, 0.8),
            repeat: -1,
            yoyo: true,
            repeatDelay: gsap.utils.random(0.4, 1.6),
            ease: "power2.inOut",
            delay: gsap.utils.random(0, 1.8),
          })

          gsap.to(rect, {
            y: `+=${gsap.utils.random(-35, 35)}`,
            x: `+=${gsap.utils.random(-24, 24)}`,
            duration: gsap.utils.random(2.2, 4.4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: gsap.utils.random(0, 2),
          })
        }
      }
    }, svgRef)

    return () => ctx.revert()
  }, [rank, c])

  return (
    <svg
      ref={svgRef}
      viewBox="-200 -250 400 450"
      className={`w-full h-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Trophy body gradient */}
        <linearGradient
          id={`trophyGrad-${rank}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c.shine} />
          <stop offset="25%" stopColor={c.primary} />
          <stop offset="55%" stopColor={c.secondary} />
          <stop offset="80%" stopColor={c.primary} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>

        {/* Metallic vertical shine */}
        <linearGradient
          id={`metalShine-${rank}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c.shine} stopOpacity="1" />
          <stop offset="35%" stopColor={c.primary} stopOpacity="0.9" />
          <stop offset="70%" stopColor={c.dark} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c.darker} stopOpacity="1" />
        </linearGradient>

        {/* Handle gradient */}
        <linearGradient
          id={`handleGrad-${rank}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="40%" stopColor={c.primary} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>

        {/* Base gradient */}
        <linearGradient
          id={`baseGrad-${rank}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="45%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`glow-${rank}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.4  0 0 0 0.9 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glitter glow */}
        <filter
          id={`glitterGlow-${rank}`}
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for shine effect */}
        <clipPath id={`trophyClip-${rank}`}>
          <path
            d="M -70 -60 
               Q -75 0 -50 40 
               Q -30 60 0 65 
               Q 30 60 50 40 
               Q 75 0 70 -60 
               Q 60 -100 0 -110 
               Q -60 -100 -70 -60 Z"
          />
        </clipPath>

        {/* Shine sweep gradient */}
        <linearGradient
          id={`shineGradient-${rank}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Glitter container */}
      <g ref={glitterContainerRef} filter={`url(#glitterGlow-${rank})`} />

      {/* Trophy */}
      <g ref={trophyRef} filter={`url(#glow-${rank})`}>
        {/* soft base glow */}
        <ellipse
          cx="0"
          cy="155"
          rx="90"
          ry="22"
          fill={c.glow}
          opacity="0.28"
          filter="blur(12px)"
        />

        {/* Base bottom */}
        <ellipse cx="0" cy="145" rx="80" ry="15" fill={`url(#baseGrad-${rank})`} />
        <rect
          x="-80"
          y="130"
          width="160"
          height="15"
          fill={`url(#baseGrad-${rank})`}
        />
        <ellipse cx="0" cy="130" rx="80" ry="15" fill="#252525" />

        {/* Base top */}
        <ellipse cx="0" cy="120" rx="60" ry="12" fill={`url(#baseGrad-${rank})`} />
        <rect
          x="-60"
          y="108"
          width="120"
          height="12"
          fill={`url(#baseGrad-${rank})`}
        />
        <ellipse cx="0" cy="108" rx="60" ry="12" fill="#3a3a3a" />

        {/* Gold ring */}
        <ellipse
          cx="0"
          cy="108"
          rx="55"
          ry="10"
          fill="none"
          stroke={c.primary}
          strokeWidth="3"
        />
        <ellipse
          cx="0"
          cy="106"
          rx="48"
          ry="8"
          fill="none"
          stroke={c.shine}
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Stem */}
        <path
          d="M -15 108 Q -20 70 -12 50 L 12 50 Q 20 70 15 108 Z"
          fill={`url(#metalShine-${rank})`}
        />
        <ellipse cx="0" cy="50" rx="15" ry="5" fill={c.primary} />
        <ellipse cx="0" cy="48" rx="12" ry="4" fill={c.shine} opacity="0.6" />

        {/* Cup body */}
        <path
          d="M -70 -60 
             Q -75 0 -50 40 
             Q -30 60 0 65 
             Q 30 60 50 40 
             Q 75 0 70 -60 
             Q 60 -100 0 -110 
             Q -60 -100 -70 -60 Z"
          fill={`url(#metalShine-${rank})`}
          stroke={c.dark}
          strokeWidth="2"
        />

        {/* Inner shadow & rim */}
        <ellipse cx="0" cy="-100" rx="45" ry="15" fill={c.darker} opacity="0.65" />
        <ellipse
          cx="0"
          cy="-100"
          rx="55"
          ry="18"
          fill="none"
          stroke={c.primary}
          strokeWidth="4"
        />
        <ellipse
          cx="0"
          cy="-102"
          rx="50"
          ry="15"
          fill="none"
          stroke={c.shine}
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Handles */}
        <path
          d="M -65 -50 
             Q -115 -55 -120 -10 
             Q -122 32 -82 38 
             Q -60 39 -53 20"
          fill="none"
          stroke={`url(#handleGrad-${rank})`}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M -65 -50 
             Q -102 -52 -107 -12 
             Q -107 24 -80 30"
          fill="none"
          stroke={c.shine}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />

        <path
          d="M 65 -50 
             Q 115 -55 120 -10 
             Q 122 32 82 38 
             Q 60 39 53 20"
          fill="none"
          stroke={`url(#handleGrad-${rank})`}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 65 -50 
             Q 102 -52 107 -12 
             Q 107 24 80 30"
          fill="none"
          stroke={c.shine}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Decorative bands */}
        <path
          d="M -60 -20 Q 0 -10 60 -20"
          fill="none"
          stroke={c.shine}
          strokeWidth="3"
          opacity="0.5"
        />
        <path
          d="M -55 0 Q 0 10 55 0"
          fill="none"
          stroke={c.shine}
          strokeWidth="2"
          opacity="0.35"
        />

        {/* Small star cluster under rank */}
        <g transform="translate(0, -10)" opacity="0.75">
          {[0, 120, 240].map((angle, i) => (
            <polygon
              key={i}
              points="0,-6 2,-2 6,-2 3,0 4,4 0,2 -4,4 -3,0 -6,-2 -2,-2"
              fill={c.shine}
              transform={`rotate(${angle}) translate(22,0)`}
            />
          ))}
        </g>

        {/* Rank text */}
        <text
          x="0"
          y="-30"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize="48"
          fontWeight="bold"
          fontFamily="system-ui, Arial, sans-serif"
        >
          {rank}
          <tspan fontSize="26" dy="-15">
            {rank === 1 ? "st" : rank === 2 ? "nd" : "rd"}
          </tspan>
        </text>

        {/* Shine sweep */}
        <g clipPath={`url(#trophyClip-${rank})`}>
          <rect
            ref={shineRef}
            x="-180"
            y="-210"
            width="70"
            height="320"
            fill={`url(#shineGradient-${rank})`}
            opacity="0.35"
            transform="rotate(20)"
          />
        </g>

        {/* Highlights */}
        <ellipse
          cx="-38"
          cy="-62"
          rx="9"
          ry="16"
          fill={c.shine}
          opacity="0.7"
          transform="rotate(-18)"
        />
        <ellipse
          cx="-26"
          cy="-80"
          rx="5"
          ry="9"
          fill="#FFFFFF"
          opacity="0.9"
          transform="rotate(-18)"
        />
      </g>
    </svg>
  )
}
