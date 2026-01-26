"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    id: 1,
    question: "How many members can be in a team?",
    answer:
      "Teams can have up to 4 members. Cross-department collaboration is allowed and encouraged to bring diverse perspectives.",
  },
  {
    id: 2,
    question: "When must the project be built?",
    answer:
      "Core development must happen during the hackathon duration. Existing projects can only be extended with prior organizer approval.",
  },
  {
    id: 3,
    question: "What about originality and plagiarism?",
    answer:
      "All submissions must be 100% original work. Any detected plagiarism or code theft results in immediate disqualification.",
  },
  {
    id: 4,
    question: "What is the code of conduct?",
    answer:
      "Maintain respect and professionalism at all times. Harassment, discrimination, or disruptive behavior will not be tolerated.",
  },
  {
    id: 5,
    question: "How do I submit my project?",
    answer:
      "Submit a Git repository link along with a short demo video (under 3 minutes) or live presentation during judging.",
  },
  {
    id: 6,
    question: "How is judging conducted?",
    answer:
      "A panel of expert judges evaluates based on announced criteria. Their decision is final and binding for all participants.",
  },
]

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered FAQ entrance with scroll trigger
      faqRefs.current.forEach((faq, i) => {
        if (!faq) return

        gsap.from(faq, {
          scale: 0.9,
          opacity: 0,
          rotation: -5,
          y: 60,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: faq,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      })

      // Floating particles animation
      floatingElementsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: -200,
          x: i % 2 === 0 ? 100 : -100,
          rotation: 360,
          duration: 20 + i * 3,
          repeat: -1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      })

      // Section title sequence
      gsap.from(".faq-hero-text", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-header",
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))

    faqRefs.current.forEach((el, i) => {
      if (!el) return
      const answer = el.querySelector(".faq-answer") as HTMLDivElement | null
      if (!answer) return

      if (i === index && activeIndex !== index) {
        el.classList.add("active")
        gsap.to(answer, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        })
      } else {
        el.classList.remove("active")
        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at center, #0f0f23 0%, #02040f 50%, #000000 100%)",
      }}
    >
      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          ref={(el) => {
            floatingElementsRef.current[i] = el
          }}
          className="absolute w-3 h-3 md:w-5 md:h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40 blur-sm"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated glow overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Hero Header */}
        <div className="faq-header text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping [animation-duration:2s]" />
            <span className="text-lg font-medium text-indigo-300 tracking-wide uppercase">
              Frequently Asked Questions
            </span>
          </motion.div>

          <motion.h2
            className="faq-hero-text text-5xl md:text-7xl lg:text-[8rem] font-black mb-6 leading-none"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500 bg-clip-text block">
              Got
            </span>
            <span className="text-white block">Questions?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know before the hackathon begins. Click to
            expand.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              ref={(el) => {
                faqRefs.current[i] = el
              }}
              className="faq-item group cursor-pointer overflow-hidden"
              onClick={() => toggleFAQ(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-slate-900/50 via-indigo-900/20 to-purple-900/20 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 backdrop-blur-xl">
                {/* Decorative corner orb */}
                <div className="absolute top-4 right-6 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300 blur-sm" />

                {/* FAQ Number + icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-300 font-medium">
                    Q{faq.id.toString().padStart(2, "0")}
                  </span>
                  <motion.div
                    className="w-6 h-6 flex items-center justify-center text-indigo-400 text-lg font-bold ml-3"
                    animate={{ rotate: activeIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    +
                  </motion.div>
                </div>

                {/* Question */}
                <h3
                  className="text-2xl lg:text-[1.6rem] font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {faq.question}
                </h3>

                {/* Answer */}
                <div className="faq-answer h-0 opacity-0 overflow-hidden">
                  <div className="mt-6 pt-6 border-t border-indigo-500/20">
                    <p className="text-lg text-slate-200/90 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
