"use client"

import { useRef, useEffect, useState, MouseEvent } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Use generic placeholders; replace with real sponsors later
const sponsors = [
  {
    name: "Sponsor 1",
    image:
      "https://static.vecteezy.com/system/resources/previews/016/833/880/non_2x/github-logo-git-hub-icon-with-text-on-white-background-free-vector.jpg",
    tier: "featured" as const,
  },
  {
    name: "Sponsor 2",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9c6ac1126180025.6127e4d670fdb.jpg",
    tier: "featured" as const,
  },
  {
    name: "Sponsor 3",
    image: "https://img-cdn.inc.com/image/upload/inlineimages/Google1_31326.png",
    tier: "standard" as const,
  },
  {
    name: "Sponsor 4",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.xNooNb8qvBDF9_y6pyPIoQHaEK?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    tier: "standard" as const,
  },
  {
    name: "Sponsor 5",
    image:
      "https://vectorseek.com/wp-content/uploads/2021/01/Amazon-Logo-Vector-768x768.jpg",
    tier: "standard" as const,
  },
  {
    name: "Sponsor 6",
    image:
      "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/10/Meta-Logo.jpeg",
    tier: "standard" as const,
  },
  {
    name: "Sponsor 7",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.wnOAY28dtzuFHveOryw2WwHaEl?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    tier: "standard" as const,
  },
  {
    name: "Sponsor 8",
    image:
      "https://blog.logomyway.com/wp-content/uploads/2020/12/twitter-logo.jpg",
    tier: "standard" as const,
  },
]

const logosRow = [...sponsors, ...sponsors]

// ---- VARIANTS (typed) -------------------------------------------------

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
}

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

const headingLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.9, 0.25, 1],
    },
  },
}

const titleLetters: Variants = {
  hidden: { opacity: 0.7, letterSpacing: "0.16em" },
  visible: {
    opacity: 1,
    letterSpacing: "0.22em",
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    },
  },
}

// ---- COMPONENT --------------------------------------------------------

export function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeWrapperRef = useRef<HTMLDivElement>(null)

  // for scroll-reactive depth on marquee
  const { scrollYProgress } = useScroll({
    target: marqueeWrapperRef,
    offset: ["start end", "end start"],
  })

  const marqueeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97])
  const marqueeY = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4])

  // cursor spotlight over marquee
  const [spotlightPos, setSpotlightPos] = useState({ x: "50%", y: "50%" })

  const handleMarqueeMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - bounds.left) / bounds.width) * 100
    const y = ((e.clientY - bounds.top) / bounds.height) * 100
    setSpotlightPos({ x: `${x}%`, y: `${y}%` })
  }

  const handleMarqueeMouseLeave = () => {
    setSpotlightPos({ x: "50%", y: "50%" })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.to(".sponsor-orb", {
        y: (i: number) => (i % 2 === 0 ? -20 : 18),
        x: (i: number) => (i % 2 === 0 ? 8 : -10),
        duration: (i: number) => 14 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Faster wobble on the entire marquee strip
      gsap.to(".sponsor-marquee", {
        rotateX: -6,
        duration: 4, // faster oscillation
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id="sponsors"
      className="relative py-16 md:py-20 bg-[#030014] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay noise-texture" />

      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sponsor-orb absolute -top-32 left-1/5 w-64 h-64 rounded-full bg-purple-500/18 blur-3xl" />
        <div className="sponsor-orb absolute bottom-[-28%] right-1/4 w-72 h-72 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* heading block */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          variants={headingContainer}
        >
          {/* breathing label */}
          <motion.p
            className="text-[0.65rem] md:text-xs tracking-[0.22em] uppercase text-purple-100/70"
            variants={titleLetters}
            animate={{
              letterSpacing: ["0.22em", "0.26em", "0.22em"],
              opacity: [0.8, 0.9, 0.8],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Thank you to our sponsors
          </motion.p>
          <motion.h2
            className="mt-3 text-[1.4rem] md:text-[1.65rem] font-semibold text-white/95"
            style={{ fontFamily: "var(--font-heading)" }}
            variants={headingLine}
          >
            Backing the next wave of builders.
          </motion.h2>
          <motion.p
            className="mt-3 text-[0.8rem] md:text-sm text-slate-300/75 max-w-xl mx-auto"
            variants={headingLine}
          >
            A curated group of partners helping make this experience possible.
          </motion.p>
        </motion.div>

        {/* featured sponsors row – hero emphasis */}
        <motion.div
          className="mb-8 md:mb-10 flex flex-wrap justify-center gap-4 md:gap-6"
          variants={headingLine}
        >
          {sponsors
            .filter((s) => s.tier === "featured")
            .map((s, idx) => (
              <motion.div
                key={s.name}
                className="group relative shrink-0 px-6 py-5 md:px-8 md:py-6 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md"
                initial={{
                  scale: 1,
                  boxShadow:
                    "0 18px 50px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 255, 0.06)",
                }}
                animate={
                  idx === 0
                    ? {
                        scale: [1, 1.04, 1],
                        boxShadow: [
                          "0 18px 50px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 255, 0.06)",
                          "0 22px 60px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(191, 219, 254, 0.26)",
                          "0 18px 50px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 255, 0.06)",
                        ],
                      }
                    : {}
                }
                transition={
                  idx === 0
                    ? {
                        duration: 0.9,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.25,
                      }
                    : undefined
                }
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 1.02 }}
              >
                {/* soft gradient ring */}
                <div className="pointer-events-none absolute inset-[-1px] rounded-3xl bg-gradient-to-br from-purple-500/25 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* light sweep */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-y-0 w-[40%] -left-1/2 bg-gradient-to-r from-white/0 via-white/12 to-white/0 group-hover:translate-x-[220%] translate-x-[-120%] transition-transform duration-[1200ms] ease-[0.19,1,0.22,1]" />
                </div>

                <div className="relative flex items-center gap-4 md:gap-5">
                  <div className="w-40 md:w-52 h-14 md:h-16 flex items-center justify-center">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="max-w-[98%] max-h-[98%] object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.22em] uppercase text-purple-200/85">
                      Premier Partner
                    </span>
                    <span className="mt-1 text-xs md:text-sm text-slate-50/95">
                      {s.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* marquee + ambient track + cursor spotlight */}
        <div
          ref={marqueeWrapperRef}
          className="relative mx-auto max-w-5xl"
          onMouseMove={handleMarqueeMouseMove}
          onMouseLeave={handleMarqueeMouseLeave}
        >
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030014] via-[#030014] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030014] via-[#030014] to-transparent z-20" />

          {/* ambient track glow behind logos */}
          <div className="pointer-events-none absolute inset-y-[30%] left-[-10%] right-[-10%] rounded-full bg-gradient-to-r from-purple-500/0 via-purple-400/12 to-cyan-400/0 blur-3xl opacity-80" />

          {/* spotlight overlay following cursor */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl z-10"
            style={{
              background: `radial-gradient(circle at ${spotlightPos.x} ${spotlightPos.y}, rgba(255,255,255,0.16), transparent 55%)`,
              opacity: 0.9,
              mixBlendMode: "soft-light",
            }}
          />

          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="sponsor-marquee flex gap-8 md:gap-10 items-stretch will-change-transform"
              style={{
                scale: marqueeScale,
                y: marqueeY,
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 16,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {logosRow.map((sponsor, i) => {
                const isFeatured = sponsor.tier === "featured"
                const verticalDrift = i % 2 === 0 ? -4 : 4
                const baseScale = isFeatured ? 1.02 : 0.96

                return (
                  <motion.div
                    key={`${sponsor.name}-${i}`}
                    className="group relative shrink-0 flex items-center gap-3 md:gap-4 px-5 py-3 md:px-6 md:py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md"
                    style={{ transformOrigin: "center" }}
                    initial={{
                      opacity: isFeatured ? 0.9 : 0.7,
                      y: verticalDrift,
                      scale: baseScale,
                    }}
                    whileHover={{
                      scale: baseScale + 0.06,
                      y: verticalDrift - 2,
                    }}
                    transition={{
                      duration: 0.24,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {/* premium border glow on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/35 via-transparent to-cyan-400/35 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />

                    {/* subtle inner highlight */}
                    <div className="pointer-events-none absolute inset-[1px] rounded-[1rem] bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-250" />

                    <div className="relative w-32 md:w-40 h-12 md:h-14 flex items-center justify-center">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className={`max-w-[98%] max-h-[98%] object-contain transition-opacity duration-200 ${
                          isFeatured
                            ? "opacity-90 group-hover:opacity-100"
                            : "opacity-70 group-hover:opacity-90"
                        }`}
                      />
                    </div>
                    <span
                      className={`relative hidden sm:inline text-[0.6rem] md:text-[0.68rem] tracking-[0.18em] uppercase ${
                        isFeatured
                          ? "text-slate-50/85"
                          : "text-slate-200/60 group-hover:text-slate-100/80"
                      } transition-colors duration-200`}
                    >
                      {sponsor.name}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.p
          className="mt-7 text-[0.7rem] md:text-xs text-center text-slate-300/75"
          variants={headingLine}
        >
          Want your logo here next year?{" "}
          <a
            href="mailto:sponsors@xyntra.com"
            className="underline decoration-purple-400/70 underline-offset-4 hover:text-purple-200 transition-colors"
          >
            Talk to us
          </a>
          .
        </motion.p>
      </div>
    </motion.section>
  )
}
