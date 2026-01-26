"use client"

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion"
import { animate } from "animejs"

gsap.registerPlugin(ScrollTrigger)

function RegisterButton({ size }: { size: "hero" | "header" }) {
  const isHeader = size === "header"

  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={
        "group relative font-semibold tracking-wide text-black overflow-hidden shadow-[0_18px_50px_rgba(168,85,247,0.55)] rounded-full " +
        (isHeader
          ? "px-6 py-2 text-xs md:text-sm h-9 md:h-10"
          : "px-8 py-3 text-sm md:text-base")
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        Register Now
        <svg
          className={
            "transition-transform " +
            (isHeader
              ? "w-3.5 h-3.5 group-hover:translate-x-0.5"
              : "w-4 h-4 group-hover:translate-x-1")
          }
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </motion.button>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const taglineRef = useRef<HTMLDivElement | null>(null)
  const xyntraWallRef = useRef<HTMLDivElement | null>(null)

  // Mouse tilt (only for right block)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 160 })
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 160 })
  const tiltRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10])
  const tiltRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
    },
    [mouseX, mouseY],
  )

  // Scroll progress for hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacityOnScroll = useTransform(scrollYProgress, [0, 0.6], [1, 0.1])

  // countdown
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const targetDate = new Date("2026-03-15T03:30:00Z")

    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const id = setInterval(updateCountdown, 1000)
    return () => clearInterval(id)
  }, [])

  // tagline GSAP
  useEffect(() => {
    if (!taglineRef.current) return
    const words = Array.from(
      taglineRef.current.querySelectorAll<HTMLSpanElement>("[data-word]"),
    )
    if (!words.length) return

    gsap.set(words, {
      opacity: 0,
      yPercent: 140,
      rotateX: -90,
      skewY: 18,
      filter: "blur(18px)",
      transformOrigin: "left center",
    })

    const tl = gsap.timeline({ delay: 0.35 })
    tl.to(words, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      skewY: 0,
      filter: "blur(0px)",
      ease: "expo.out",
      duration: 1.1,
      stagger: { each: 0.06, from: "start" },
    })
      .fromTo(
        taglineRef.current,
        { letterSpacing: "0.02em", scale: 0.98 },
        {
          letterSpacing: "0.2em",
          scale: 1.02,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.9",
      )
      .to(
        taglineRef.current,
        {
          letterSpacing: "0.06em",
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.4",
      )

    const glow = taglineRef.current.querySelectorAll<HTMLElement>("[data-glow]")
    if (glow.length) {
      gsap.to(glow, {
        backgroundPositionX: "220%",
        duration: 4,
        ease: "linear",
        repeat: -1,
      })
    }

    return () => {
      tl.kill()
      gsap.killTweensOf(words)
      gsap.killTweensOf(glow)
    }
  }, [])

  // XYNTRA wall
  useEffect(() => {
    if (!xyntraWallRef.current) return
    const tiles = xyntraWallRef.current.querySelectorAll(".xyntra-tile")
    if (!tiles.length) return

    animate(tiles, {
      translateY: ["0%", "-40%"],
      easing: "linear",
      duration: 28000,
      loop: true,
    })

    animate(tiles, {
      opacity: [
        { value: 0.05, duration: 0 },
        { value: 0.16, duration: 2500 },
        { value: 0.1, duration: 2500 },
      ],
      delay: (_el, i) => i * 220,
      easing: "easeInOutSine",
      duration: 5000,
      direction: "alternate",
      loop: true,
    })
  }, [])

  // interactive code typing
  const [isCodeHovered, setIsCodeHovered] = useState(false)

  const codeLinesBase = [
    "// hack · build · ship",
    'const event = "XYNTRA 2.0";',
    "const duration = 24 * hours;",
    'const location = "Rajalakshmi Engineering College";',
    "launch(team);",
    "// see you at the arena 🚀",
  ]

  const [visibleCode, setVisibleCode] = useState<string[]>(codeLinesBase)

  useEffect(() => {
    if (!isCodeHovered) {
      setVisibleCode(codeLinesBase)
      return
    }

    let cancelled = false

    const sequence = async () => {
      const newLines: string[] = []
      for (let i = 0; i < codeLinesBase.length; i++) {
        if (cancelled) return
        newLines.push("")
        setVisibleCode([...newLines])
        const line = codeLinesBase[i]
        let current = ""
        for (let j = 0; j < line.length; j++) {
          if (cancelled) return
          current += line[j]
          newLines[i] = current
          setVisibleCode([...newLines])
          await new Promise((r) => setTimeout(r, 18))
        }
        await new Promise((r) => setTimeout(r, 80))
      }
    }

    sequence()

    return () => {
      cancelled = true
    }
  }, [isCodeHovered])

  return (
    <>
      {/* HERO SECTION (header removed) */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#04010c] pt-16"
      >
        {/* softened gradient base */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0,#4c1d95_0,transparent_55%),radial-gradient(circle_at_70%_100%,#fb923c_0,transparent_60%),linear-gradient(135deg,#020016,#0b041f,#1a0b2b)] opacity-80" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#030014] via-[#030014]/60 to-transparent" />
        </div>

        {/* subtle grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:120px_100%] blur-sm" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:100%_120px] blur-[1px]" />
        </div>

        {/* XYNTRA ad wall */}
        <div
          ref={xyntraWallRef}
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
        >
          <div className="absolute -inset-x-10 top-[-20%] h-[180%]">
            <div className="grid grid-cols-4 gap-6 h-full w-full text-[0.8rem] font-medium tracking-[0.55em] uppercase text-gray-200/10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="xyntra-tile flex items-center justify-center border border-white/3 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/[0.02] backdrop-blur-[2px]"
                >
                  <span className="bg-gradient-to-r from-violet-300 to-orange-300 bg-clip-text text-transparent">
                    XYNTRA
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* glow blobs */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.45),transparent_60%)] mix-blend-screen blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.55),transparent_60%)] mix-blend-screen blur-3xl" />

        <motion.div
          className="relative z-20 px-6 md:px-10 lg:px-16 w-full max-w-6xl"
          style={{ opacity: opacityOnScroll }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2">
              {/* badge */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-violet-400/50 bg-black/40 backdrop-blur-sm mb-6 mt-4"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs md:text-sm text-violet-50 tracking-[0.22em] uppercase">
                  National Level 24 Hrs Hackathon
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-[0.8rem] md:text-sm text-violet-100/80 mb-2 tracking-[0.25em] uppercase"
              >
                Learn • Build • Innovate
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24 }}
                className="text-5xl md:text-6xl lg:text-[4.5rem] font-black mb-2 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-heading, system-ui)" }}
              >
                <span className="block text-gray-50">XYNTRA</span>
              </motion.h1>

              {/* Tagline */}
              <div
                ref={taglineRef}
                className="text-base md:text-lg text-violet-50/95 mb-4 max-w-xl leading-relaxed"
              >
                <span data-word className="inline-block mr-1">
                  Where
                </span>
                <span data-word className="inline-block mr-1">
                  Ideas
                </span>
                <span data-word className="inline-block mr-1">
                  Collide.
                </span>{" "}
                <span
                  data-word
                  data-glow
                  className="inline-block mr-1 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-orange-200 bg-[length:220%_100%] bg-clip-text text-transparent"
                >
                  Innovation
                </span>
                <span
                  data-word
                  data-glow
                  className="inline-block bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 bg-[length:220%_100%] bg-clip-text text-transparent"
                >
                  Ignites.
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-sm md:text-base text-violet-100/80 mb-8"
              >
                Hosted by Rajalakshmi Engineering College in collaboration with
                leading tech communities.
              </motion.p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex items-center gap-3 md:gap-5 mb-10"
              >
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Mins" },
                  { value: countdown.seconds, label: "Secs" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/45 to-orange-400/45 blur-md" />
                      <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-b from-white/12 via-white/5 to-white/10 border border-white/10 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
                        {isClient ? (
                          <motion.span
                            key={item.value}
                            initial={{ y: -14, opacity: 0, rotateX: -90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="text-2xl md:text-3xl font-semibold text-violet-50"
                            style={{ fontFamily: "var(--font-heading, system-ui)" }}
                          >
                            {String(item.value).padStart(2, "0")}
                          </motion.span>
                        ) : (
                          <span className="text-2xl md:text-3xl font-semibold text-violet-50/60">
                            --
                          </span>
                        )}
                        <motion.div
                          initial={{ x: "-120%" }}
                          animate={{ x: "120%" }}
                          transition={{
                            duration: 1.4,
                            delay: index * 0.15,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent"
                        />
                      </div>
                    </div>
                    <span className="mt-2 block text-[0.65rem] md:text-xs text-violet-100/75 uppercase tracking-[0.25em]">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-6"
              >
                <RegisterButton size="hero" />
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full font-semibold text-sm md:text-base tracking-wide text-violet-50 border border-violet-300/50 bg-black/40 hover:bg-black/70 transition-colors"
                >
                  View Problem Statements
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT: computer / code block */}
            <motion.div
              className="w-full lg:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsCodeHovered(true)}
              onMouseLeave={() => {
                mouseX.set(0)
                mouseY.set(0)
                setIsCodeHovered(false)
              }}
            >
              <motion.div
                style={{
                  rotateX: tiltRotateX,
                  rotateY: tiltRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-md"
              >
                <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.6),transparent_60%)] blur-3xl" />

                <div
                  className="relative rounded-3xl bg-gradient-to-br from-[#181326] via-[#0d0718] to-[#05020b] border border-violet-500/50 shadow-[0_35px_90px_rgba(0,0,0,0.9)] overflow-hidden"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/70">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[0.7rem] text-violet-200/80 tracking-[0.18em] uppercase">
                      Live Coding Preview
                    </span>
                  </div>

                  <div className="relative px-6 py-6">
                    <div className="grid grid-cols-3 gap-4 items-stretch">
                      <div className="col-span-1 space-y-3">
                        <div className="rounded-2xl border border-violet-400/60 bg-gradient-to-b from-violet-500/35 to-transparent p-3">
                          <p className="text-[0.65rem] text-violet-100/90 mb-1">
                            Category
                          </p>
                          <p className="text-[0.75rem] text-gray-100">
                            National • 24 Hrs
                          </p>
                        </div>
                        <div className="rounded-2xl border border-violet-500/40 bg-black/70 p-3">
                          <p className="text-[0.65rem] text-violet-200/80 mb-1">
                            Mode
                          </p>
                          <p className="text-[0.75rem] text-gray-100">Onsite</p>
                        </div>
                        <div className="rounded-2xl border border-violet-500/40 bg-black/70 p-3">
                          <p className="text-[0.65rem] text-violet-200/80 mb-1">
                            Tracks
                          </p>
                          <p className="text-[0.75rem] text-gray-100">
                            Web • AI • IoT
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="rounded-2xl border border-violet-500/40 bg-[#050616] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-violet-700/60 bg-[#09091c]">
                            <span className="text-[0.65rem] text-violet-200/80">
                              /xyntra/hero.tsx
                            </span>
                            <span className="text-[0.65rem] text-emerald-300">
                              ● LIVE
                            </span>
                          </div>
                          <div className="px-4 py-3 text-[0.72rem] font-mono leading-relaxed">
                            {visibleCode.map((line, idx) => (
                              <p
                                key={idx}
                                className={
                                  idx === 0 || idx === visibleCode.length - 1
                                    ? "text-violet-400"
                                    : idx === 1
                                    ? "text-emerald-400"
                                    : idx === 2
                                    ? "text-sky-400"
                                    : idx === 3
                                    ? "text-fuchsia-300"
                                    : "text-amber-300"
                                }
                              >
                                {line}
                                {isCodeHovered &&
                                  idx === visibleCode.length - 1 && (
                                    <span className="inline-block w-2 h-4 ml-1 bg-emerald-300 animate-pulse" />
                                  )}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-5">
                    <div className="flex items-center justify-between text-[0.7rem] text-violet-200/80">
                      <span>Rajalakshmi Engineering College</span>
                      <span>XYNTRA Hackathon</span>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 h-4 rounded-b-3xl bg-gradient-to-r from-[#262033] via-[#141322] to-[#05020b] shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
                  style={{ transform: "translateZ(12px)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* footer */}
        <div className="absolute bottom-5 left-0 right-0 z-20 px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.7rem] text-violet-100/80">
          <p>© XYNTRA Hackathon · Rajalakshmi Engineering College</p>
          <p className="flex flex-wrap items-center gap-2 md:gap-3">
            <span>Built for innovators</span>
            <span className="hidden md:inline-block">·</span>
            <span>Chennai, Tamil Nadu</span>
          </p>
        </div>
      </section>
    </>
  )
}
