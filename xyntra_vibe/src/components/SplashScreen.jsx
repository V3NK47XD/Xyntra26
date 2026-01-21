import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const splashRef = useRef(null);
  const xRef = useRef(null);
  const yntraRef = useRef(null);

  useEffect(() => {
     if (!xRef.current || !yntraRef.current || !splashRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    });
   // Set initial state
    gsap.set(xRef.current, { scale: 0, rotation: -180, opacity: 0 });
    gsap.set(yntraRef.current, { x: -100, opacity: 0 });
       tl.to(xRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'back.out(1.7)'
    })
    .to(yntraRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to([xRef.current, yntraRef.current], {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    })
    .to([xRef.current, yntraRef.current], {
        opacity: 0,
     duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.5
    });
  }, [onComplete]);

  return (
    <div ref={splashRef} className="splash-screen">
      <div className="splash-logo">
        <span ref={xRef} className="logo-x">X</span>
        <span ref={yntraRef} className="logo-yntra">YNTRA</span>
      </div>
      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }} />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;