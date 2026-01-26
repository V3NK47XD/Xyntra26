"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 500);
    };

    handleScroll(); // run once
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="navbar">
        <span className={`nav-item ${showBtn ? "shift-left" : ""}`} onClick={() => scrollTo("hero")}>
          Home
        </span>

        <span className={`nav-item ${showBtn ? "shift-left" : ""}`} onClick={() => scrollTo("timeline")}>
          Timeline
        </span>

        <h1 className={`xyntra ${showBtn ? "show" : ""}`} onClick={() => scrollTo("hero")}>
          XYNTRA
        </h1>

        <span className={`nav-item ${showBtn ? "shift-right" : ""}`} onClick={() => scrollTo("domains")}>
          Domains
        </span>

        <span className={`nav-item ${showBtn ? "shift-right" : ""}`} onClick={() => scrollTo("prizes")}>
          Prizes
        </span>
      </nav>

      <style jsx>{`
      
        .navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 14px 80px;

  /* Glass base */
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.45)
  );
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);

  /* Visible outer border */
  border: 1px solid rgba(255, 255, 255, 0.91);

  border-radius: 20px;
  z-index: 1000;

  /* Depth */
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.45),
    inset 0 1px 1px rgba(255, 255, 255, 0.25);

  overflow: hidden;
}

/* Glass texture / grain */
.navbar::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.08) 1px,
    transparent 1px
  );
  background-size: 4px 4px;
  opacity: 0.25;
  pointer-events: none;
}


        .nav-item {
          color: white;
          cursor: pointer;
          transition: transform 0.4s ease;
        }

        .shift-left {
          transform: translateX(-40px);
        }

        .shift-right {
          transform: translateX(40px);
        }

        .xyntra {
          opacity: 0;
          transform: scale(0.0);
          pointer-events: none;
          transition: all 0.4s ease;
          font-weight: 700;
          font-size: 0px;
        }

        .xyntra.show {
         background: radial-gradient(
    circle at 50% 50%,
    #f5bc1f 0%,
    #cfae56 10%,
    #cfae56 30%,
    #6b3cff 55%,
    #3a1c8f 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  color: transparent;
          opacity: 1;
          transform: scale(2);
          pointer-events: auto;
          font-size: 24px;
        }
      `}</style>
    </>
  );
}
