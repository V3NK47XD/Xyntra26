"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    id: 1,
    date: "March 10",
    time: "12:00 AM",
    title: "Registration Opens",
    description: "Begin your journey by registering your team on Unstop",
    type: "milestone",
  },
  {
    id: 2,
    date: "March 14",
    time: "11:59 PM",
    title: "Registration Closes",
    description: "Last chance to secure your spot in XYNTRA 2026",
    type: "deadline",
  },
  {
    id: 3,
    date: "March 15",
    time: "9:00 AM",
    title: "Opening Ceremony",
    description: "Kickoff with inspiring talks and problem statements reveal",
    type: "event",
  },
  {
    id: 4,
    date: "March 15",
    time: "10:00 AM",
    title: "Hacking Begins",
    description: "48 hours of non-stop innovation starts now",
    type: "start",
  },
  {
    id: 5,
    date: "March 15",
    time: "6:00 PM",
    title: "Mentor Sessions",
    description: "Get guidance from industry experts and tech leaders",
    type: "workshop",
  },
  {
    id: 6,
    date: "March 16",
    time: "12:00 PM",
    title: "Mid-Hackathon Check",
    description: "Progress review and additional support",
    type: "checkpoint",
  },
  {
    id: 7,
    date: "March 17",
    time: "10:00 AM",
    title: "Hacking Ends",
    description: "Final code commit and project submission",
    type: "deadline",
  },
  {
    id: 8,
    date: "March 17",
    time: "2:00 PM",
    title: "Demo & Judging",
    description: "Present your innovation to the panel of judges",
    type: "event",
  },
  {
    id: 9,
    date: "March 17",
    time: "5:00 PM",
    title: "Awards Ceremony",
    description: "Winners announced and prizes distributed",
    type: "finale",
  },
]

function getTypeColor(type: string) {
  switch (type) {
    case "milestone":
      return "#a855f7"
    case "deadline":
      return "#ef4444"
    case "event":
      return "#0ea5e9"
    case "start":
      return "#10b981"
    case "workshop":
      return "#f59e0b"
    case "checkpoint":
      return "#8b5cf6"
    case "finale":
      return "#ec4899"
    default:
      return "#a855f7"
  }
}

function getTypeIcon(type: string, color: string) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    className: "w-5 h-5",
  }

  switch (type) {
    case "milestone":
      return (
        <svg {...props}>
          <path d="M3 3v18h18" />
          <path d="M7 12l5-5 4 4 5-5" />
        </svg>
      )
    case "deadline":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    case "event":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    case "start":
      return (
        <svg {...props}>
          <polygon points="5 3 19 12 5 21 5 3" fill={`${color}30`} />
        </svg>
      )
    case "workshop":
      return (
        <svg {...props}>
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      )
    case "checkpoint":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      )
    case "finale":
      return (
        <svg {...props}>
          <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 1012 0V2z" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
  }
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const eventRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  })
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // cards + dots
      eventRefs.current.forEach((ref, i) => {
        if (!ref) return
        const isLeft = i % 2 === 0

        gsap.fromTo(
          ref,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        )

        const dot = ref.querySelector(".timeline-dot")
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      })

      // path
      const path = document.querySelector<SVGPathElement>(".timeline-anim-path")
      if (path && sectionRef.current) {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const tPositions = [0.05, 0.18, 0.30, 0.40, 0.52, 0.63, 0.74, 0.84, 0.93]

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 md:py-32 bg-[#030014] overflow-hidden"
    >
      {/* ALWAYS-ANIMATED BACKGROUND */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* big animated glows */}
        <motion.div
          className="absolute -top-40 -left-32 w-[320px] h-[320px] rounded-full bg-purple-500/25 blur-[110px]"
          animate={{ x: [0, 40, 10, 0], y: [0, -30, -10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-80px] right-[-40px] w-[320px] h-[320px] rounded-full bg-cyan-400/22 blur-[110px]"
          animate={{ x: [0, -35, -10, 0], y: [0, 25, 5, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* neon grid that gently warps */}
        <motion.div
          className="absolute inset-0"
          animate={{ skewY: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-45 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </motion.div>
      </motion.div>

      {/* DRAGGABLE HACKATHON OBJECTS */}
      <div className="pointer-events-none md:pointer-events-auto absolute inset-0">
        {/* Task card */}
        <motion.div
          className="hidden md:flex absolute top-24 left-[10%] w-52 rounded-2xl border border-purple-400/40 bg-[#07051a]/95 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ top: -40, left: -40, right: 140, bottom: 120 }}
          dragElastic={0.35}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          whileHover={{ scale: 1.04, rotate: -2 }}
          whileTap={{ scale: 1.02 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col w-full p-4 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 uppercase tracking-[0.18em] text-[10px]">
                Task
              </span>
              <span className="text-[10px] text-white/50">#XYNTRA-26</span>
            </div>
            <div className="text-sm font-semibold text-white">
              Build your winning prototype
            </div>
            <div className="flex items-center justify-between text-[11px] text-white/60 mt-1">
              <span>Team slots left: 14</span>
              <span className="text-emerald-400">Live</span>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="h-1 w-1/3 rounded-full bg-purple-500" />
              <span className="h-1 w-1/3 rounded-full bg-cyan-400" />
              <span className="h-1 w-1/3 rounded-full bg-slate-500/60" />
            </div>
          </div>
        </motion.div>

        {/* Server chip */}
        <motion.div
          className="hidden md:flex absolute bottom-24 right-[14%] w-40 h-20 rounded-2xl border border-cyan-400/40 bg-[#021923]/95 backdrop-blur-md shadow-[0_0_26px_rgba(34,211,238,0.55)] cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ top: -120, left: -140, right: 40, bottom: 40 }}
          dragElastic={0.4}
          dragTransition={{ bounceStiffness: 650, bounceDamping: 32 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 1.02 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full flex flex-col justify_between p-3 text-[11px] text-cyan-50/90 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                Node • 03
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex justify-between text-[11px]">
              <span>CPU: 72%</span>
              <span>RAM: 63%</span>
            </div>
            <div className="h-1.5 rounded-full bg-cyan-900/60 overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* <> token */}
        <motion.div
          className="hidden md:flex absolute top-1/2 left-[55%] -translate-y-1/2 w-16 h-16 rounded-2xl border border-white/25 bg-white/5 backdrop-blur-md shadow-[0_0_24px_rgba(148,163,184,0.7)] items-center justify-center text-[13px] font-mono text-slate-50 cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ top: -80, left: -80, right: 80, bottom: 80 }}
          dragElastic={0.5}
          dragTransition={{ bounceStiffness: 700, bounceDamping: 35 }}
          whileHover={{ scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 1.03 }}
          animate={{ y: [-8, 6, -8] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-8 border border-purple-500/30 text-purple-300 bg-purple-500/15 backdrop-blur-sm"
          >
            The Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-white">Event </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl mx-auto"
          >
            Mark your calendars and prepare for an unforgettable journey of
            innovation
          </motion.p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          {/* Curved SVG path - Desktop */}
          <div className="hidden md:block absolute inset-0 flex justify-center pointer-events-none">
            <svg
              viewBox="0 0 400 900"
              className="h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="
                  M 50 40
                  H 340
                  Q 380 40 380 80
                  V 260
                  Q 380 300 340 300
                  H 60
                  Q 20 300 20 340
                  V 520
                  Q 20 560 60 560
                  H 340
                  Q 380 560 380 600
                  V 780
                  Q 380 820 340 820
                  H 50
                "
                fill="none"
                stroke="rgba(148,163,184,0.35)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                className="timeline-anim-path"
                d="
                  M 50 40
                  H 340
                  Q 380 40 380 80
                  V 260
                  Q 380 300 340 300
                  H 60
                  Q 20 300 20 340
                  V 520
                  Q 20 560 60 560
                  H 340
                  Q 380 560 380 600
                  V 780
                  Q 380 820 340 820
                  H 50
                "
                fill="none"
                stroke="url(#timelineGradient)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="timelineGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile straight line */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-cyan-500 origin-top"
              style={{ scaleY }}
            />
          </div>

          {/* Events */}
          <div className="relative space-y-8 md:space-y-0">
            {timelineEvents.map((event, i) => {
              const color = getTypeColor(event.type)
              const isLeft = i % 2 === 0
              const t = tPositions[i] ?? 0.5

              return (
                <div
                  key={event.id}
                  ref={(el) => {
                    eventRefs.current[i] = el
                  }}
                  className={`relative flex items-start md:items-center gap-6 md:gap-0 pb-8 md:pb-16 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      isLeft
                        ? "md:pr-16 md:text-right"
                        : "md:pl-16 md:text-left"
                    }`}
                  >
                    <motion.div
                      className="relative group inline-block w_full max-w-md"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                        style={{
                          background: `radial-gradient(circle, ${color}25, transparent 70%)`,
                        }}
                      />
                      <div
                        className={`relative p-5 md:p-6 rounded-2xl border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-sm group-hover:border-white/20 transition-all duration-300 ${
                          isLeft ? "md:ml-auto" : "md:mr-auto"
                        }`}
                      >
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                            isLeft ? "md:ml-auto" : ""
                          }`}
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {getTypeIcon(event.type, color)}
                          <span className="capitalize">{event.type}</span>
                        </div>

                        <div
                          className={`text-sm mb-2 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                          style={{ color }}
                        >
                          {event.date} &bull; {event.time}
                        </div>

                        <h3
                          className={`text-lg md:text-xl font-bold text-white mb-2 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {event.title}
                        </h3>

                        <p
                          className={`text-white/50 text-sm ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          {event.description}
                        </p>

                        <div
                          className={`connector-line hidden md:block absolute top-1/2 w-8 h-px origin-${
                            isLeft ? "right" : "left"
                          } ${isLeft ? "-right-8" : "-left-8"}`}
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="timeline-dot hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center z-10"
                    style={{
                      top: `calc(${t * 100}% + 40px)`,
                      backgroundColor: color,
                      boxShadow: `0 0 20px ${color}50`,
                    }}
                  >
                    <div
                      className="absolute w-8 h-8 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <div
                    className="timeline-dot md:hidden absolute left-6 -translate-x-1/2 w-3 h-3 rounded-full z-10 top-2"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 15px ${color}50`,
                    }}
                  />

                  <div className="flex-1 hidden md:block" />
                </div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
