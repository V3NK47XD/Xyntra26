"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MedalSvgProps {
  rank: 2 | 3
  className?: string
}

export function MedalSvg({ rank, className = "" }: MedalSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const glitterContainerRef = useRef<SVGGElement>(null)
  const medalRef = useRef<SVGGElement>(null)
  const ribbonLeftRef = useRef<SVGPathElement>(null)
  const ribbonRightRef = useRef<SVGPathElement>(null)

  const colors = {
    2: {
      primary: "#C0C0C0",
      secondary: "#E8E8E8",
      dark: "#808080",
      darker: "#505050",
      shine: "#FFFFFF",
      ribbon: "#1E40AF",
      ribbonDark: "#1E3A8A",
    },
    3: {
      primary: "#CD7F32",
      secondary: "#DEB887",
      dark: "#8B4513",
      darker: "#5D3A1A",
      shine: "#F4A460",
      ribbon: "#DC2626",
      ribbonDark: "#B91C1C",
    },
  }

  const c = colors[rank]

  useEffect(() => {
    if (!svgRef.current || !glitterContainerRef.current || !medalRef.current)
      return

    const ctx = gsap.context(() => {
      // entrance swing
      gsap.fromTo(
        medalRef.current,
        { rotation: -28, opacity: 0, transformOrigin: "center top" },
        {
          rotation: 0,
          opacity: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        },
      )

      // gentle swing + float
      gsap.to(medalRef.current, {
        rotation: 4,
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center top",
      })

      // ribbon wave
      if (ribbonLeftRef.current && ribbonRightRef.current) {
        gsap.to([ribbonLeftRef.current, ribbonRightRef.current], {
          attr: {
            d:
              rank === 2
                ? "M -50 -180 Q -60 -105 -45 -25 Q -35 15 -50 38"
                : "M -50 -180 Q -57 -105 -47 -25 Q -38 15 -46 40",
          },
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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
          c.ribbon,
        ]

        for (let i = 0; i < 55; i++) {
          const size = gsap.utils.random(3, 9)
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          )
          rect.setAttribute("width", String(size))
          rect.setAttribute("height", String(size))
          rect.setAttribute("x", String(gsap.utils.random(-120, 120)))
          rect.setAttribute("y", String(gsap.utils.random(-160, 160)))
          rect.setAttribute("rx", "1")
          rect.setAttribute(
            "fill",
            glitterColors[Math.floor(Math.random() * glitterColors.length)],
          )
          rect.setAttribute("opacity", "0")

          glitterGroup.appendChild(rect)

          gsap.to(rect, {
            opacity: gsap.utils.random(0.5, 1),
            scale: gsap.utils.random(0.6, 1.6),
            rotation: gsap.utils.random(-40, 40),
            duration: gsap.utils.random(0.35, 0.8),
            repeat: -1,
            yoyo: true,
            repeatDelay: gsap.utils.random(0.5, 1.8),
            ease: "power2.inOut",
            delay: gsap.utils.random(0, 1.6),
          })

          gsap.to(rect, {
            y: `+=${gsap.utils.random(-28, 28)}`,
            x: `+=${gsap.utils.random(-18, 18)}`,
            duration: gsap.utils.random(2.2, 4.2),
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
      viewBox="-150 -200 300 400"
      className={`w-full h-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Medal gradient */}
        <radialGradient id={`medalGrad-${rank}`} cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor={c.shine} />
          <stop offset="40%" stopColor={c.primary} />
          <stop offset="80%" stopColor={c.dark} />
          <stop offset="100%" stopColor={c.darker} />
        </radialGradient>

        {/* Edge gradient */}
        <linearGradient
          id={`edgeGrad-${rank}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c.shine} />
          <stop offset="50%" stopColor={c.dark} />
          <stop offset="100%" stopColor={c.darker} />
        </linearGradient>

        {/* Ribbon gradient */}
        <linearGradient
          id={`ribbonGrad-${rank}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={c.ribbonDark} />
          <stop offset="50%" stopColor={c.ribbon} />
          <stop offset="100%" stopColor={c.ribbonDark} />
        </linearGradient>

        {/* Glow filter */}
        <filter
          id={`medalGlow-${rank}`}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0.9 0.6  0 0 0 0 0.3  0 0 0 0.9 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glitter glow */}
        <filter
          id={`glitterGlowM-${rank}`}
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glitter */}
      <g ref={glitterContainerRef} filter={`url(#glitterGlowM-${rank})`} />

      {/* Medal */}
      <g ref={medalRef} filter={`url(#medalGlow-${rank})`}>
        {/* top glow */}
        <ellipse
          cx="0"
          cy="150"
          rx="70"
          ry="18"
          fill={c.shine}
          opacity="0.2"
          filter="blur(10px)"
        />

        {/* Ribbon left */}
        <path
          ref={ribbonLeftRef}
          d="M -50 -180 Q -58 -105 -45 -25 Q -38 15 -50 38"
          fill="none"
          stroke={`url(#ribbonGrad-${rank})`}
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M -60 -180 Q -66 -105 -55 -25"
          fill="none"
          stroke={c.ribbon}
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Ribbon right */}
        <path
          ref={ribbonRightRef}
          d="M 50 -180 Q 58 -105 45 -25 Q 38 15 50 38"
          fill="none"
          stroke={`url(#ribbonGrad-${rank})`}
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M 60 -180 Q 66 -105 55 -25"
          fill="none"
          stroke={c.ribbon}
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Ribbon connector */}
        <ellipse cx="0" cy="-180" rx="60" ry="15" fill={c.ribbon} />
        <ellipse
          cx="0"
          cy="-183"
          rx="55"
          ry="12"
          fill={c.ribbonDark}
          opacity="0.5"
        />

        {/* Outer ring */}
        <circle cx="0" cy="60" r="85" fill={`url(#edgeGrad-${rank})`} />
        {/* Main medal */}
        <circle cx="0" cy="60" r="75" fill={`url(#medalGrad-${rank})`} />
        {/* Rings */}
        <circle
          cx="0"
          cy="60"
          r="65"
          fill="none"
          stroke={c.shine}
          strokeWidth="2"
          opacity="0.55"
        />
        <circle
          cx="0"
          cy="60"
          r="55"
          fill="none"
          stroke={c.dark}
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Starburst */}
        <g transform="translate(0, 45)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <polygon
              key={i}
              points="0,-25 6,-8 24,-8 10,3 15,20 0,10 -15,20 -10,3 -24,-8 -6,-8"
              fill={c.shine}
              opacity="0.9"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Laurel wreath left */}
        <g transform="translate(-45, 60)" opacity="0.75">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={i * 5}
              cy={-20 + i * 8}
              rx="8"
              ry="4"
              fill={c.shine}
              transform={`rotate(${-30 + i * 15})`}
            />
          ))}
        </g>

        {/* Laurel wreath right */}
        <g transform="translate(45, 60) scale(-1, 1)" opacity="0.75">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={i * 5}
              cy={-20 + i * 8}
              rx="8"
              ry="4"
              fill={c.shine}
              transform={`rotate(${-30 + i * 15})`}
            />
          ))}
        </g>

        {/* Rank number */}
        <text
          x="0"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={c.darker}
          fontSize="42"
          fontWeight="bold"
          fontFamily="system-ui, Arial, sans-serif"
        >
          {rank}
          <tspan fontSize="24" dy="-10">
            {rank === 2 ? "nd" : "rd"}
          </tspan>
        </text>

        {/* Highlight reflection */}
        <ellipse
          cx="-25"
          cy="35"
          rx="15"
          ry="25"
          fill={c.shine}
          opacity="0.4"
          transform="rotate(-20)"
        />
        <ellipse
          cx="-15"
          cy="25"
          rx="8"
          ry="12"
          fill="#FFFFFF"
          opacity="0.6"
          transform="rotate(-20)"
        />
      </g>
    </svg>
  )
}
