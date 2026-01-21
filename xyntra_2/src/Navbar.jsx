import { useEffect, useState } from "react";
import "./styles/Navbar.css";

export default function Navbar() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById("root"); // your scroll container
    if (!scrollEl) return;

    const handleScroll = () => {
      if (scrollEl.scrollTop > 620) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    handleScroll();
    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <span
        className={`nav-item ${showBtn ? "shift-left" : ""}`}
        onClick={() => scrollTo("hero")}
      >
        Home
      </span>
      <span
        className={`nav-item ${showBtn ? "shift-left" : ""}`}
        onClick={() => scrollTo("timeline")}
      >
        Timeline
      </span>

      <button
        className={`register-btn nav-btn ${showBtn ? "show" : "hide"}`}
        onClick={() => scrollTo("hero")}
      >
        REGISTER NOW
      </button>

      <span
        className={`nav-item ${showBtn ? "shift-right" : ""}`}
        onClick={() => scrollTo("domains")}
      >
        Domains
      </span>
      <span
        className={`nav-item ${showBtn ? "shift-right" : ""}`}
        onClick={() => scrollTo("prize")}
      >
        Prizes
      </span>
    </nav>
  );
}
