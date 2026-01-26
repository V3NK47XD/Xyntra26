"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationProps {
  onComplete: () => void
}

/**
 * Cinematic XYNTRA intro
 * Black base, electric‑purple glow, sharp heading font
 */
export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [showSkipHint, setShowSkipHint] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const handleComplete = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setIsVisible(false)
        onComplete()
      },
    })
  }, [onComplete])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: handleComplete,
      })
      timelineRef.current = tl

      // Initial states
      gsap.set(containerRef.current, { opacity: 1, scale: 1.02 })
      gsap.set(".nf-vignette", { opacity: 0 })
      gsap.set(".nf-bg-glow", { opacity: 0 })
      gsap.set(".nf-stripe", {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "center bottom",
      })
      gsap.set(".nf-star", { opacity: 0, scale: 0.3 })

      gsap.set(lettersRef.current, {
        opacity: 0,
        y: 10,
      })
      gsap.set(".nf-tagline", { opacity: 0, y: 24 })
      gsap.set(".nf-flash", { opacity: 0 })

      // Phase 1: background glows + stars
      tl.to(
        ".nf-vignette",
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        0,
      )

      tl.to(
        ".nf-bg-glow",
        {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        0.1,
      )

      tl.to(
        ".nf-star",
        {
          opacity: 0.5,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "random",
          },
        },
        0.15,
      )

      tl.to(
        containerRef.current,
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0,
      )

      // Phase 2: gold stripes
      tl.to(
        ".nf-stripe",
        {
          opacity: 0.75,
          scaleY: 1,
          duration: 0.7,
          stagger: {
            each: 0.05,
            from: "center",
          },
          ease: "power4.out",
        },
        0.4,
      )

      tl.to(
        ".nf-stripe",
        {
          xPercent: (i) => (i % 2 === 0 ? -8 : 8),
          duration: 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        0.55,
      )

      // Phase 3: sharp XYNTRA fade‑up
      tl.to(
        lettersRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.06,
            from: "center",
          },
        },
        0.9,
      )

      tl.to(
        ".nf-tagline",
        {
          opacity: 0.85,
          y: 0,
          duration: 0.5,
        },
        1.1,
      )

      // Small flash
      tl.to(
        ".nf-flash",
        {
          opacity: 1,
          duration: 0.1,
          ease: "power4.in",
        },
        1.3,
      ).to(
        ".nf-flash",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        ">-0.02",
      )

      // small hold before auto exit
      tl.to({}, { duration: 0.6 })
    }, containerRef)

    const skipTimer = setTimeout(() => setShowSkipHint(true), 1100)

    return () => {
      clearTimeout(skipTimer)
      ctx.revert()
    }
  }, [handleComplete])

  const handleSkip = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    handleComplete()
  }, [handleComplete])

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ["click", "keydown", "touchstart"]
    events.forEach((e) =>
      window.addEventListener(e, handleSkip, { once: true }),
    )
    return () => {
      events.forEach((e) => window.removeEventListener(e, handleSkip))
    }
  }, [handleSkip])

  if (!isVisible) return null

  const letters = "XYNTRA".split("")
  const stripeCount = 11

  // tuned colors: neutral white text, electric purple glow
  const baseTextColor = "#f9fafb"
  const electricPurple = "#a855ff"

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      {/* Vignette dark edges */}
      <div
        className="nf-vignette absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(15,23,42,0) 45%, rgba(3,7,18,0.97) 100%)",
        }}
      />

      {/* Multi‑spot background glows */}
      <div className="nf-bg-glow absolute inset-0 pointer-events-none">
        {/* Center cyan / purple mix */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(15,23,42,0) 65%)",
            filter: "blur(10px)",
          }}
        />
        {/* Top‑left soft purple */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            left: "10%",
            top: "10%",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.26) 0%, rgba(15,23,42,0) 70%)",
            filter: "blur(14px)",
          }}
        />
        {/* Bottom‑right warm accent */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            right: "8%",
            bottom: "5%",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.16) 0%, rgba(15,23,42,0) 70%)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* Star / dust layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="nf-star absolute rounded-full"
            style={{
              width: "2px",
              height: "2px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: "rgba(148,163,184,0.9)",
            }}
          />
        ))}
      </div>

      {/* Gold stripes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {Array.from({ length: stripeCount }).map((_, i) => {
          const baseWidth = 6 + Math.random() * 14
          const hue = 45
          return (
            <div
              key={i}
              className="nf-stripe"
              style={{
                width: `${baseWidth}px`,
                height: "130%",
                marginInline: "4px",
                background: `linear-gradient(
                  180deg,
                  hsla(${hue}, 65%, 45%, 0) 0%,
                  hsla(${hue}, 80%, 55%, 0.7) 45%,
                  hsla(${hue}, 95%, 70%, 0.25) 70%,
                  hsla(${hue}, 65%, 45%, 0) 100%
                )`,
              }}
            />
          )
        })}
      </div>

      {/* Logo block */}
      <div className="relative z-10 text-center">
        <div className="relative flex items-center justify-center gap-1.5 md:gap-2.5">
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-black"
              style={{
                fontFamily: "var(--font-heading, system-ui)",
                color: baseTextColor,
                letterSpacing: "0.12em",
                textShadow: `0 0 10px ${electricPurple}, 0 0 26px rgba(168,85,247,0.6)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="nf-tagline mt-6 text-[0.7rem] md:text-xs tracking-[0.45em] text-slate-100/80 uppercase">
          Xyntra · Clear With A Spark.
        </div>
      </div>

      {/* Soft flash overlay */}
      <div
        className="nf-flash absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 32%, rgba(0,0,0,0.96) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Skip hint */}
      <AnimatePresence>
        {showSkipHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-8 text-[0.65rem] tracking-[0.3em] text-white/60 uppercase"
          >
            Click or press any key to skip
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
