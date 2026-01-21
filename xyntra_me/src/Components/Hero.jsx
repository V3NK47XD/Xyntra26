import { useEffect, useRef } from "react";
import gsap from "gsap";
import NET from "vanta/dist/vanta.net.min";
import "./Hero.css"; // ✅ IMPORTANT


export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Vanta background
    const vantaEffect = NET({
      el: bgRef.current,
      THREE: window.THREE,
      color: 0x9b5de5,
      backgroundColor: 0x000000,
      points: 10,
      maxDistance: 22,
      spacing: 18,
    });

    // GSAP 3D fall + bounce
    gsap.fromTo(
  ".letter",
  {
    opacity: 0,
    z: 500,
    scale: 0.5,
  },
  {
    opacity: 1,
    z: -20,        // 👈 overshoot toward camera
    scale: 1.05,
    duration: 1.4,
    ease: "expo.out",
    stagger: 0.12,
    onComplete: () => {
      gsap.to(".letter", {
        z: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    },
  }
);


    return () => vantaEffect.destroy();
  }, []);

  return (
    <div ref={bgRef} className="hero">
      <div ref={heroRef} className="hero-content">
        <h1 className="title">
          <span className="letter gold">X</span>
          {"YNTRA".split("").map((l, i) => (
            <span key={i} className="letter purple">
              {l}
            </span>
          ))}
        </h1>
        <p className="subtitle">IEEE Computer Society Event</p>
      </div>
    </div>
  );
}
