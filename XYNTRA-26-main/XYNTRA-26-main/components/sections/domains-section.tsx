"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── DATA ──────────────────────────────────────────────────────────────

const domains = [
  {
    id: 1,
    title: "Artificial Intelligence",
    subtitle: "Machine Learning & Deep Learning",
    description:
      "Build intelligent systems that learn, adapt, and transform industries with cutting-edge AI and neural network solutions.",
    color: "#a855f7",
    icon: "ai",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.RgJ4_NScOOWkifKc-5aVSQHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 2,
    title: "Web3 & Blockchain",
    subtitle: "Decentralized Applications",
    description:
      "Decentralize the future with smart contracts, DeFi protocols, and revolutionary blockchain applications.",
    color: "#0ea5e9",
    icon: "blockchain",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Tihg_xxRRXTO6a7jMM0-ZAHaDi?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 3,
    title: "HealthTech",
    subtitle: "Digital Healthcare Innovation",
    description:
      "Revolutionize healthcare with AI diagnostics, telemedicine platforms, and life-saving medical technologies.",
    color: "#10b981",
    icon: "health",
    image:
      "https://static.businessworld.in/benefits-of-tech-in-healthcare-scaled_20250421195050_original_image_20.webp",
  },
  {
    id: 4,
    title: "Sustainable Tech",
    subtitle: "Green Innovation & CleanTech",
    description:
      "Create technology for a sustainable tomorrow with renewable energy solutions and eco-friendly innovations.",
    color: "#84cc16",
    icon: "sustainable",
    image: "https://cdn.bap-software.net/2025/02/14235538/12p3.png",
  },
  {
    id: 5,
    title: "FinTech",
    subtitle: "Financial Technology",
    description:
      "Transform financial services with digital payments, algorithmic trading, and inclusive banking solutions.",
    color: "#f59e0b",
    icon: "fintech",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/324/230/original/financial-technology-and-business-world-class-icon-fintech-and-things-on-dark-blue-technology-background-represents-the-connection-financial-technology-banking-and-business-world-class-vector.jpg",
  },
  {
    id: 6,
    title: "Open Innovation",
    subtitle: "Boundless Creativity",
    description:
      "Your wildest ideas welcome here. No boundaries, no limits — surprise us with your vision.",
    color: "#ec4899",
    icon: "open",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.SH43sFWW9Y0m8br3kwN7cgHaEK?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
]

const hackathonDetails = [
  "24-hour on-site build sprint",
  "On-ground mentors & tech experts",
  "Judging by industry professionals",
  "Prize pool & swag for top teams",
]

const signoffPoints = [
  "Come with an idea, leave with a product",
  "Perfect for portfolio & networking",
  "Push your limits and ship fast",
  "XYNTRA 2025 • Chennai",
]

// ── ICONS ─────────────────────────────────────────────────────────────

function DomainIcon({ type, color }: { type: string; color: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    className: "w-8 h-8",
  }

  switch (type) {
    case "ai":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" fill={`${color}30`} />
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    case "blockchain":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="6" height="6" rx="1" fill={`${color}30`} />
          <rect x="15" y="3" width="6" height="6" rx="1" fill={`${color}30`} />
          <rect x="9" y="15" width="6" height="6" rx="1" fill={`${color}30`} />
          <path d="M9 6h6M6 9v6l3 3M18 9v6l-3 3" />
        </svg>
      )
    case "health":
      return (
        <svg {...iconProps}>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={`${color}30`}
          />
          <path d="M12 8v8M8 12h8" strokeWidth={2} />
        </svg>
      )
    case "sustainable":
      return (
        <svg {...iconProps}>
          <path d="M12 22V13" />
          <path
            d="M12 13c0-5 4.5-8 8-8-1.5 5-3 8-8 8z"
            fill={`${color}30`}
          />
          <path
            d="M12 13c0-5-4.5-8-8-8 1.5 5 3 8 8 8z"
            fill={`${color}30`}
          />
          <ellipse cx="12" cy="22" rx="4" ry="1.5" />
        </svg>
      )
    case "fintech":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" fill={`${color}30`} />
          <path d="M12 6v12" strokeWidth={2} />
          <path d="M9 9h5a2 2 0 0 1 0 4H9" strokeWidth={2} />
          <path d="M9 13h6a2 2 0 0 1 0 4H9" strokeWidth={2} />
        </svg>
      )
    case "open":
      return (
        <svg {...iconProps}>
          <path
            d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8l-6 4.4 2.4-7.2-6-4.8h7.6L12 2z"
            fill={`${color}30`}
          />
        </svg>
      )
    default:
      return null
  }
}

// ── GRAND 3D CUBE (6 FACES, DRAG ONLY) ───────────────────────────────

function DomainCube({
  domain,
  index,
  isActive,
}: {
  domain: (typeof domains)[0]
  index: number
  isActive: boolean
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(cardRef, { once: false, margin: "-60px" })

  const baseRotation = useRef(0)
  const rotation = useMotionValue(0)
  const rotateY = useSpring(rotation, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  })

  const side = 280 // slightly larger than before
  const half = side / 2

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${isActive ? "z-10" : "z-0"}`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* glow + shadow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[34px] opacity-40 group-hover:opacity-85 blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top, ${domain.color}55, transparent 65%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[34px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]" />

      <div
        className="relative h-80 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          style={{
            width: side,
            height: side,
            transformStyle: "preserve-3d",
            rotateY,
            cursor: "grab",
          }}
          onDrag={(event, info) => {
            // convert drag delta to degrees; accumulate so you can spin forever
            const deltaDeg = info.delta.x * 0.7
            baseRotation.current += deltaDeg
            rotation.set(baseRotation.current)
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-3xl border border-white/22 bg-gradient-to-br from-[#08081a] via-[#050514] to-[#02010a] backdrop-blur-2xl overflow-hidden"
            style={{
              transform: `translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="absolute inset-[10px] rounded-2xl bg-gradient-to-br from-white/6 to-transparent border border-white/5" />
            <div className="relative h-full p-6 flex flex-col">
              <motion.div
                className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center relative"
                style={{ backgroundColor: `${domain.color}24` }}
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
              >
                <DomainIcon type={domain.icon} color={domain.color} />
              </motion.div>
              <p
                className="text-[0.7rem] tracking-[0.28em] uppercase mb-1"
                style={{ color: domain.color }}
              >
                {domain.subtitle}
              </p>
              <h3
                className="text-lg md:text-xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {domain.title}
              </h3>
              <p className="text-xs text-white/65 mb-1">
                Face 1 · Overview
              </p>
              <p className="text-xs text-white/55">
                Drag left or right to spin this cube in place and explore every
                side of the domain.
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 text-[0.7rem]">
                <span className="text-white/40">Drag to rotate</span>
                <span className="px-3 py-1 rounded-full border border-white/25 bg-white/5 text-white/70">
                  3D Domain Cube
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="absolute inset-0 rounded-3xl border border-white/20 bg-gradient-to-br from-[#050514] to-[#02010a] backdrop-blur-2xl overflow-hidden"
            style={{
              transform: `rotateY(90deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="relative h-full p-6 flex flex-col">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/45 mb-3">
                Face 2 · Visual
              </p>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/4 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="w-[95%] h-[85%] rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="max-w-[95%] max-h-[90%] object-contain opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-3xl border border-white/20 bg-gradient-to-br from-[#050514] to-[#02010a] backdrop-blur-2xl overflow-hidden"
            style={{
              transform: `rotateY(180deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="relative h-full p-6 flex flex-col">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/45 mb-3">
                Face 3 · Hackathon
              </p>
              <ul className="space-y-2 text-xs text-white/75">
                {hackathonDetails.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="mt-[3px] h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: domain.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LEFT */}
          <div
            className="absolute inset-0 rounded-3xl border border-white/20 bg-gradient-to-br from-[#050514] to-[#02010a] backdrop-blur-2xl overflow-hidden"
            style={{
              transform: `rotateY(-90deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="relative h-full p-6 flex flex-col">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/45 mb-3">
                Face 4 · Why this track
              </p>
              <ul className="space-y-2 text-xs text-white/75">
                {signoffPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[3px] h-1.5 w-4 rounded-full bg-white/15" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TOP (closed, glassy cap) */}
          <div
            className="absolute inset-0 rounded-3xl border border-white/14 bg-gradient-to-br from-white/10 to-transparent"
            style={{
              transform: `rotateX(90deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl bg-white/6 mix-blend-screen" />
          </div>

          {/* BOTTOM (closed, darker base) */}
          <div
            className="absolute inset-0 rounded-3xl border border-black/60 bg-gradient-to-tr from-black/70 to-black/95"
            style={{
              transform: `rotateX(-90deg) translateZ(${half}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 rounded-3xl bg-black/70" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── SECTION WRAPPER ───────────────────────────────────────────────────

export function DomainsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll(".char")
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.025,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="domains"
      className="relative min-h-screen bg-[#030014] py-24 md:py-32 overflow-hidden"
    >
      {/* animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full bg-purple-500/12 blur-[110px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-pink-500/7 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-8 border border-purple-500/30 text-purple-300 bg-purple-500/10 backdrop-blur-sm"
          >
            Challenge Tracks
          </motion.span>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 overflow-hidden"
            style={{ fontFamily: "var(--font-heading)", perspective: "1000px" }}
          >
            {splitText("Explore Domains")}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/55 text-lg max-w-2xl mx-auto"
          >
            Grab each cube and spin it in place. All six faces close into a full
            3D block for every domain.
          </motion.p>
        </div>

        {/* cube grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {domains.map((domain, i) => (
            <div key={domain.id} onMouseEnter={() => setActiveIndex(i)}>
              <DomainCube
                domain={domain}
                index={i}
                isActive={activeIndex === i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
