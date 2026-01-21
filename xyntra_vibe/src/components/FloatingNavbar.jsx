import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingNavbar.css';

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="floating-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-content">
        <div className="navbar-logo">
          <span className="logo-x-nav">X</span>
          <span className="logo-yntra-nav">YNTRA</span>
        </div>
        
        <div className="navbar-links">
          <button onClick={() => scrollToSection('home')} className="nav-link interactive">
            Home
          </button>
          <button onClick={() => scrollToSection('domains')} className="nav-link interactive">
            Domains
          </button>
          <button onClick={() => scrollToSection('prize')} className="nav-link interactive">
            Prize
          </button>
          <button onClick={() => scrollToSection('timeline')} className="nav-link interactive">
            Timeline
          </button>
          <a href="/register" className="nav-register-btn interactive">
            REGISTER NOW
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNavbar;