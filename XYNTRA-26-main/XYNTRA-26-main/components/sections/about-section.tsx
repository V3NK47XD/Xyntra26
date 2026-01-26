"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)
  const springValue = useSpring(mv, { damping: 30, stiffness: 80 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      mv.set(value)
    }
  }, [inView, value, mv])

  useEffect(() => {
    const unsub = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsub
  }, [springValue])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 48, suffix: "h", label: "Non‑stop building" },
  { value: 500, suffix: "+", label: "Hackers on‑site" },
  { value: 50, suffix: "K", label: "Prize pool (₹)" },
  { value: 30, suffix: "+", label: "Colleges represented" },
  { value: 25, suffix: "+", label: "Mentors & judges" },
]

const orbitingPlanets = [
  { text: "Yearly Once Competition", color: "#D4AF37" },
  { text: "Resume Worthy", color: "#F0E68C" },
  { text: "Good Recognition", color: "#B8860B" },
  { text: "Collaborative Experience", color: "#DAA520" },
  { text: "Students Driven", color: "#FFD700" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Softened gradient base */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,#4c1d95_0,transparent_80%),radial-gradient(circle_at_70%_0%,#fb923c_0,transparent_48%),linear-gradient(135deg,#020016,#0b041f,#1a0b2b)] opacity-80" />
      </div>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.45),transparent_60%)] mix-blend-screen blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.55),transparent_30%)] mix-blend-screen blur-3xl" />

      {/* Animated Background Elements with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Grid overlay - subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30" />
      </motion.div>
      
      {/* Bottom gradient fade to #030014 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", damping: 20 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 text-[0.75rem] md:text-sm text-[#D4AF37] bg-[#D4AF37]/10 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#D4AF37]"
            />
            About XYNTRA
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
          >
            <motion.span
              animate={{ 
                y: [0, -4, 0, 2, 0],
                rotate: [0, -0.5, 0, 0.5, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              Where
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              animate={{ 
                y: [0, -6, 0, 3, 0],
                rotate: [0, 1, 0, -1, 0],
                scale: [1, 1.02, 1, 0.99, 1],
              }}
              style={{ display: "inline-block" }}
              className="bg-gradient-to-r from-[#D4AF37] via-[#F0E68C] to-[#D4AF37] bg-clip-text text-transparent"
            >
              Ideas
            </motion.span>{" "}
            <br className="hidden md:block" />
            <motion.span
              animate={{ 
                y: [0, 3, 0, -4, 0],
                rotate: [0, 0.5, 0, -0.5, 0],
              }}
              transition={{ 
                duration: 4.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="inline-block"
            >
              Become
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              animate={{ 
                y: [0, -5, 0, 4, 0],
                rotate: [0, -1, 0, 1, 0],
                scale: [1, 1.03, 1, 0.98, 1],
              }}
              style={{ display: "inline-block" }}
              className="bg-gradient-to-r from-[#F0E68C] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent"
            >
              Reality
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            XYNTRA is more than a hackathon. It&apos;s a 48-hour journey where creativity meets execution, 
            and strangers become co-founders.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16 md:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 80, rotateY: -30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                type: "spring",
                damping: 15,
              }}
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.7}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
              whileDrag={{ 
                scale: 1.08, 
                zIndex: 50,
                boxShadow: "0 25px 50px rgba(212, 175, 55, 0.35)",
                cursor: "grabbing"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)"
              }}
              className="relative p-5 md:p-6 rounded-2xl border border-[#D4AF37]/20 bg-white/[0.03] backdrop-blur-xl overflow-hidden group cursor-grab active:cursor-grabbing"
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F0E68C] bg-clip-text text-transparent"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-xs md:text-sm text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Planet Orbital System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", damping: 20 }}
          className="relative flex items-center justify-center mb-16 md:mb-24"
          style={{ height: "500px" }}
        >
          {/* Orbit rings */}
          {[1, 2, 3, 4, 5].map((ring) => (
            <motion.div
              key={ring}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ring * 0.1 }}
              className="absolute rounded-full border border-[#D4AF37]/10"
              style={{
                width: `${140 + ring * 60}px`,
                height: `${140 + ring * 60}px`,
              }}
            />
          ))}

          {/* Center Planet - XYNTRA */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", damping: 15 }}
            className="absolute z-10 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)",
                  "0 0 50px rgba(212, 175, 55, 0.6), 0 0 100px rgba(212, 175, 55, 0.3)",
                  "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F0E68C] to-[#B8860B] flex items-center justify-center"
            >
              <span className="text-[#030014] font-bold text-lg md:text-xl tracking-wider">XYNTRA</span>
            </motion.div>
          </motion.div>

          {/* Orbiting Planets */}
          {orbitingPlanets.map((planet, index) => {
            const orbitRadius = 110 + 3 * 30
            const duration = 20 + 3 * 5
            
            return (
              <motion.div
                key={planet.text}
                className="absolute"
                initial={{ opacity: 0, rotate: index * 72 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  rotate: [index * 72, index * 72 + 360],
                }}
                transition={{
                  rotate: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { duration: 0.5, delay: 0.5 + index * 0.1 }
                }}
                style={{
                  width: `${orbitRadius * 2}px`,
                  height: `${orbitRadius * 2}px`,
                }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    top: "0%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  animate={{
                    rotate: [-(index * 72), -(index * 72 + 360)],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex items-center justify-center px-3 py-2 md:px-4 md:py-2.5 rounded-full border backdrop-blur-sm cursor-pointer"
                    style={{
                      borderColor: `${planet.color}50`,
                      backgroundColor: `${planet.color}15`,
                      boxShadow: `0 0 20px ${planet.color}30`,
                    }}
                  >
                    <span 
                      className="text-[10px] md:text-xs font-medium whitespace-nowrap"
                      style={{ color: planet.color }}
                    >
                      {planet.text}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", damping: 20 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-8 md:p-12 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-transparent backdrop-blur-xl"
          >
            <motion.h3
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.3)",
                  "0 0 40px rgba(212, 175, 55, 0.5)",
                  "0 0 20px rgba(212, 175, 55, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Ready to Build Something Amazing?
            </motion.h3>
            
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join 500+ hackers, compete for ₹50K+ in prizes, and turn your ideas into reality.
            </p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[#D4AF37] font-semibold text-sm md:text-base transition-all duration-300 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
              style={{ backgroundColor: "#030014" }}
            >
              <motion.span
                className="relative flex h-3 w-3"
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37]"
                />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]" />
              </motion.span>
              Register Now for XYNTRA
              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-xs md:text-sm text-white/50"
            >
              Early-bird registrations close soon — secure your team&apos;s spot
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
