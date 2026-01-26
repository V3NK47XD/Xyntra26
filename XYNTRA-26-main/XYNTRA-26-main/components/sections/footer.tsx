"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  event: [
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "Domains", href: "#domains" },
  ],
  resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Rules", href: "#rules" },
    { label: "Code of Conduct", href: "#coc" },
    { label: "Judging Criteria", href: "#judging" },
  ],
  connect: [
    { label: "Discord", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
  ]
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1
        }
      })

      // Background animation
      gsap.to(".footer-bg-gradient", {
        backgroundPosition: "100% 100%",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1
        }
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#030014] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="footer-bg-gradient absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="footer-content relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              {/* College branding */}
              <div className="mb-4">
                <p className="text-sm text-purple-400/60 tracking-wider uppercase mb-1">Organized by</p>
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Rajalakshmi Engineering College
                </h3>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-purple-400/60 tracking-wider uppercase mb-1">In association with</p>
                <h3 className="text-lg font-medium text-purple-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  IEEE Student Branch
                </h3>
              </div>

              {/* XYNTRA Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  XYNTRA
                </span>
                <span className="text-purple-400/60 ml-2">2025</span>
              </motion.div>
            </div>

            <p className="text-purple-200/50 max-w-md mb-8">
              Where ideas collide and innovation ignites. Join us for 48 hours of 
              building, learning, and transforming the future.
            </p>

            {/* CTA */}
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Register Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Event
              </h4>
              <ul className="space-y-3">
                {footerLinks.event.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-purple-200/60 hover:text-purple-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-purple-200/60 hover:text-purple-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-purple-200/60 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                    >
                      {link.label}
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap gap-8 mb-12 text-sm text-purple-200/50">
          <a href="mailto:xyntra@rec.edu" className="hover:text-purple-300 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            xyntra@rec.edu
          </a>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Chennai, Tamil Nadu, India
          </span>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-purple-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-purple-200/40">
            © 2025 XYNTRA. Made with passion by IEEE REC.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-purple-200/40">
            <a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div
          className="text-[20vw] font-bold text-white/[0.02] text-center whitespace-nowrap -mb-[5vw]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          XYNTRA
        </div>
      </div>
    </footer>
  )
}
