"use client"

import { useState, useEffect } from "react"

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { IntroAnimation } from "@/components/sections/intro-animation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { DomainsSection } from "@/components/sections/domains-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { PrizesSection } from "@/components/sections/prizes-section"
import { SponsorsSection } from "@/components/sections/sponsors-section"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"
//import { Navbar } from "@/components/ui/navbar"
import { Navbar } from "@/components/sections/Navbar"
import { CustomCursor } from "@/components/sections/cursor"
import { SectionBridge } from "@/components/sections/SectionBridge"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {introComplete && (
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="relative">
            {/* HERO + ABOUT + 3D LAPTOP STORY */}
            <section id="hero">
              <HeroSection />
            </section>
            <SectionBridge />
            <section id="about">
              <AboutSection />
            </section>

            {/* From here on, no laptop */}
            <section id="domains">
              <DomainsSection />
            </section>

            <section id="timeline">
              <TimelineSection />
            </section>

            <section id="prizes">
              <PrizesSection />
            </section>

            <section id="sponsors">
              <SponsorsSection />
            </section>

            {/* FAQs instead of Rules & Regulations */}
            <section id="faqs">
              <FAQSection />
            </section>

            <Footer />
          </main>
        </SmoothScrollProvider>
      )}
    </>
  )
}
