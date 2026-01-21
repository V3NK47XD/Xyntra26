import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // XYNTRA — fade only
      tl.from('.hero-logo span', {
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power2.out'
      })

        // Subtitle
        .to('.hero-subtitle', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        })

        // Description
        .to('.hero-description', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4')

        // CTA (safe animation)
        .fromTo(
          '.hero-cta',
          {
            opacity: 0,
            scale: 0.85,
            visibility: 'hidden'
          },
          {
            opacity: 1,
            scale: 1,
            visibility: 'visible',
            duration: 0.7,
            ease: 'back.out(1.7)'
          },
          '-=0.2'
        );

      // Background float
      gsap.to('.bg-orb', {
        y: 30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-background">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="hero-x">X</span>
          <span className="hero-yntra">YNTRA</span>
        </motion.div>

        <h2 className="hero-subtitle">
          IEEE Computer Society Presents
        </h2>

        <p className="hero-description">
          Rajalakshmi Engineering College&apos;s Premier Hackathon Event
        </p>

        <a href="/register" className="hero-cta">
          <span>REGISTER NOW!</span>
          <div className="cta-shine" />
        </a>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
};

export default HeroSection;
