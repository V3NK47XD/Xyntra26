import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StickyRegisterButton.css';

const StickyRegisterButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="/register"
          className="sticky-register-btn interactive"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="btn-text">REGISTER NOW!</span>
          <div className="btn-glow" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default StickyRegisterButton;