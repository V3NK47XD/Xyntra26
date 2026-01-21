import { useEffect, useRef } from "react";
import gsap from "gsap";
import Galaxy from "./Galaxy";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Domains from "./Domains";
import Prize from "./Prize";
import SponsorsSection from "./Sponsor";
import TimelineSection from "./Timeline";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import "./styles/app.css";

export default function App() {
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const heroBtnRef = useRef(null);

  useEffect(() => {
    gsap.timeline()
      .fromTo(
        textRef.current,
        { scale: 8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(
        bgRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 1.2, ease: "power4.out" },
        "<"
      );
  }, []);

  return (
    <>
      <Galaxy />
      <CustomCursor />

      <Navbar triggerRef={heroBtnRef} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="bg" ref={bgRef} />

        <h1 className="xyntra" ref={textRef}>
          <span className="gold">X</span>YNTRA
        </h1>

        <button className="register-btn hero-btn" ref={heroBtnRef}>
          REGISTER NOW
        </button>
        <div className="nav-trigger" />
      </section>

      {/* DOMAINS */}
      <Domains />
      {/* PRIZES */}
      <Prize />
      {/* SPONSORS */}
      <SponsorsSection />
      {/* TIMELINE */}
      <TimelineSection />
      {/*FAQ */}
      <FAQSection />
      {/* FOOTER */}
      <Footer />
    </>
  );
}
