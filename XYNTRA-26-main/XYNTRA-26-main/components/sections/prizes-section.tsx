"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { TrophySvg } from "./svg/trophy-svg"
import { MedalSvg } from "./svg/medal-svg"
import { PodiumSvg } from "./svg/podium-svg"

gsap.registerPlugin(ScrollTrigger)

/* ---------- COLOR / PARTICLES HELPERS ---------- */

const colorSchemes = {
  gold: { primary: "#FFD700" },
  silver: { primary: "#C0C0C0" },
  bronze: { primary: "#CD7F32" },
  podium: { primary: "#A855F7" },
} as const

type ColorKey = keyof typeof colorSchemes

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

function ParticleBackground({ colorRef }: { colorRef: React.RefObject<HTMLDivElement> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<any[]>([])
  const currentColorRef = useRef<ColorKey>("gold")
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particleCount = 70
    if (particlesRef.current.length === 0) {
      const initial = colorSchemes.gold
      const rgb = hexToRgb(initial.primary)
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.5 + 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          color: { r: rgb.r, g: rgb.g, b: rgb.b },
        })
      }
    }

    const transitionToColor = (newKey: ColorKey) => {
      const target = colorSchemes[newKey]
      const rgb = hexToRgb(target.primary)
      particlesRef.current.forEach((p) => {
        gsap.to(p.color, {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          duration: 1.4,
          ease: "power2.inOut",
        })
      })
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-color" &&
          colorRef.current
        ) {
          const newColor = colorRef.current.getAttribute("data-color") as ColorKey | null
          if (newColor && newColor !== currentColorRef.current) {
            transitionToColor(newColor)
            currentColorRef.current = newColor
          }
        }
      })
    })

    if (colorRef.current) {
      observer.observe(colorRef.current, { attributes: true })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)

        ctx.shadowBlur = 18
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`
        ctx.globalAlpha = p.opacity

        ctx.fillStyle = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [colorRef])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ---------- EXISTING DATA / STYLES ---------- */

const prizes = [
  {
    rank: 1 as const,
    title: "GRAND CHAMPION",
    prize: 50000,
    description:
      "Plus exclusive mentorship, premium tech stack, and global recognition at the world's leading tech conferences.",
    type: "gold" as const,
    perks: ["VIP Mentorship", "Tech Stack Bundle", "Global Recognition"],
  },
  {
    rank: 2 as const,
    title: "ELITE RUNNER-UP",
    prize: 25000,
    description:
      "Premium hardware package and industry networking opportunities with top-tier tech leaders.",
    type: "silver" as const,
    perks: ["Hardware Package", "Industry Network", "Career Boost"],
  },
  {
    rank: 3 as const,
    title: "RISING STAR",
    prize: 10000,
    description:
      "Software licenses, cloud credits, and career acceleration program designed for emerging talent.",
    type: "bronze" as const,
    perks: ["Software Licenses", "Cloud Credits", "Acceleration Program"],
  },
] as const

const typeStyles = {
  gold: {
    gradientImage:
      "linear-gradient(135deg, #ffd700 0%, #b8860b 50%, #ffd700 100%)",
    border: "rgba(255, 215, 0, 0.6)",
    glow: "rgba(255, 215, 0, 0.45)",
    text: "#ffd700",
    shadowColor: "255, 215, 0",
  },
  silver: {
    gradientImage:
      "linear-gradient(135deg, #e8e8e8 0%, #808080 50%, #c0c0c0 100%)",
    border: "rgba(192, 192, 192, 0.6)",
    glow: "rgba(192, 192, 192, 0.45)",
    text: "#c0c0c0",
    shadowColor: "192, 192, 192",
  },
  bronze: {
    gradientImage:
      "linear-gradient(135deg, #cd7f32 0%, #8b4513 50%, #cd7f32 100%)",
    border: "rgba(205, 127, 50, 0.6)",
    glow: "rgba(205, 127, 50, 0.45)",
    text: "#cd7f32",
    shadowColor: "205, 127, 50",
  },
}

type PrizeTypeKey = keyof typeof typeStyles

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
}

function CountUp({
  value,
  prefix = "$",
  duration = 0.6,
}: {
  value: number
  prefix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = gsap.to(
      { n: 0 },
      {
        n: value,
        duration,
        ease: "power3.out",
        onUpdate: function () {
          const current = (this.targets()[0] as { n: number }).n
          setDisplay(Math.round(current))
        },
      }
    )
    return () => {
      controls.kill()
    }
  }, [value, duration])

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
    </span>
  )
}

function PrizeCard({ prize }: { prize: (typeof prizes)[number] }) {
  const styles = typeStyles[prize.type as PrizeTypeKey]

  return (
    <motion.div
      className="w-[380px] max-w-full rounded-3xl overflow-hidden backdrop-blur-sm relative"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        background:
          "linear-gradient(180deg, rgba(8,8,10,0.98) 0%, rgba(2,2,3,1) 100%)",
        border: `1.5px solid ${styles.border}`,
        boxShadow: `0 0 60px ${styles.glow}, 0 30px 60px rgba(0,0,0,0.85)`,
      }}
    >
      <div className="h-1.5" style={{ backgroundImage: styles.gradientImage }} />

      <motion.div
        className="relative h-[230px] flex items-center justify-center"
        initial={{ opacity: 0, y: 25, scale: 1.04 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${styles.glow} 0%, transparent 70%)`,
            opacity: 0.75,
          }}
        />
        <div className="relative w-[230px] h-[230px]">
          {prize.rank === 1 ? (
            <TrophySvg rank={1} />
          ) : (
            <MedalSvg rank={prize.rank as 2 | 3} />
          )}
        </div>
      </motion.div>

      <div className="p-7 pt-2 text-center">
        <motion.h3
          className="text-lg font-bold tracking-[0.18em] mb-2 uppercase"
          style={{ fontFamily: "var(--font-orbitron)", color: styles.text }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {prize.title}
        </motion.h3>

        <motion.p
          className="text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-orbitron)",
            letterSpacing: "0.08em",
            backgroundImage: styles.gradientImage,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.12 }}
        >
          <CountUp value={prize.prize} />
        </motion.p>

        <motion.p
          className="text-xs mb-5 leading-relaxed text-white/70"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.22 }}
        >
          {prize.description}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2">
          {prize.perks.map((perk, i) => (
            <motion.span
              key={perk}
              className="px-3 py-1.5 text-[11px] rounded-full font-medium"
              style={{
                background: `rgba(${styles.shadowColor}, 0.18)`,
                border: `1px solid rgba(${styles.shadowColor}, 0.45)`,
                color: styles.text,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.45,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                },
              }}
            >
              {perk}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function EvaluationTile({
  label,
  percent,
  desc,
  delay,
}: {
  label: string
  percent: number
  desc: string
  delay: number
}) {
  return (
    <motion.div
      className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-black/80 to-black/95 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
      initial={{ opacity: 0, y: 24, scale: 0.92, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-white tracking-wide">
          {label}
        </span>
        <span className="text-[11px] font-mono text-emerald-400">
          <CountUp value={percent} prefix="" duration={0.5} />%
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-500"
          initial={{ width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      <p className="text-[11px] text-white/70 leading-relaxed">{desc}</p>
      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400/40 blur-sm" />
    </motion.div>
  )
}

export function PrizesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgWrapperRef = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const bg = section.querySelector(".prizes-bg") as HTMLDivElement | null

      if (bg) {
        gsap.fromTo(
          bg,
          { opacity: 0, scale: 1.02 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          }
        )
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // shorter distance so you don't get long dead scroll
        end: "+=220%",
        pin: true,
        scrub: 1,
        pinSpacing: true,
        snap: {
          snapTo: [0, 1 / 3, 2 / 3, 1],
          duration: { min: 0.25, max: 0.6 },
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          const p = self.progress
          const idx = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3
          setStep(idx)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!bgWrapperRef.current) return
    const colorMap: ColorKey[] = ["gold", "silver", "bronze", "podium"]
    bgWrapperRef.current.setAttribute("data-color", colorMap[step])
  }, [step])

  return (
    <section
      ref={sectionRef}
      id="prizes"
      // slightly smaller than 360vh to reduce extra space around pinned area
      className="relative h-[320vh] overflow-hidden"
    >
      {/* background + particles */}
      <div
        ref={bgWrapperRef}
        data-color="gold"
        className="prizes-bg pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, #050013 0%, #02020a 45%, #010108 100%)",
        }}
      >
        <ParticleBackground colorRef={bgWrapperRef} />

        <div className="absolute -top-32 -left-10 w-72 h-72 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle,#a855f7_0%,transparent_60%)]" />
        <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle,#22c55e_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12)_0,transparent_45%),radial-gradient(circle_at_80%_100%,rgba(168,85,247,0.18)_0,transparent_55%)]" />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={`prize-step-${step}`}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.p
                className="mb-3 text-[11px] tracking-[0.32em] text-white/50 uppercase"
                style={{ fontFamily: "var(--font-orbitron)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              >
                AWARDS
              </motion.p>

              <PrizeCard prize={prizes[step]} />
            </motion.div>
          ) : (
            <motion.div
              key="podium-judges"
              className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.2fr_1.8fr] gap-10 md:gap-14 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <motion.div
                className="flex justify-center items-end"
                initial={{ opacity: 0, y: 70, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1.05 }}
                transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="relative w-[380px] max-w-full">
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-16 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(0,0,0,0.75)_0%,transparent_70%)]" />
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl opacity-70 bg-[radial-gradient(circle,#facc15_0%,transparent_65%)]" />
                  <div className="absolute inset-0 rounded-[32px] border border-yellow-300/25 pointer-events-none" />
                  <PodiumSvg />
                </div>
              </motion.div>

              <motion.div
                className="relative rounded-[28px] border border-white/12 bg-black/75 p-7 md:p-9 backdrop-blur-2xl overflow-hidden"
                initial={{ opacity: 0, x: 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute -top-24 -right-10 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.55)_0%,transparent_60%)] blur-3xl opacity-80" />

                <motion.div
                  className="flex items-center gap-3 mb-5"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-emerald-100">
                      Judges Evaluation
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/65">
                      Final Result Context
                    </span>
                  </div>
                </motion.div>

                <motion.h2
                  className="text-xl md:text-2xl font-semibold text-white mb-3"
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    letterSpacing: "0.06em",
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  How your project is scored
                </motion.h2>

                <motion.p
                  className="text-xs text-white/70 mb-5 max-w-xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  Judges combine these core dimensions to decide the final winner, balancing
                  technical depth with real-world impact and user experience.
                </motion.p>

                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, width: "0%" }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EvaluationTile
                    label="Technical Excellence"
                    percent={35}
                    desc="Architecture, performance, reliability, and overall code quality."
                    delay={0.05}
                  />
                  <EvaluationTile
                    label="Innovation & Creativity"
                    percent={25}
                    desc="Original thinking, novel approach, and uniqueness of the solution."
                    delay={0.12}
                  />
                  <EvaluationTile
                    label="User Experience"
                    percent={20}
                    desc="Clarity of flows, interaction smoothness, and visual polish."
                    delay={0.19}
                  />
                  <EvaluationTile
                    label="Impact & Feasibility"
                    percent={20}
                    desc="Real-world value, execution depth, and potential to ship."
                    delay={0.26}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
