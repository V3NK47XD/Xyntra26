import { useState } from 'react';
import CustomCursor from '../components/CustomCursor';
import SplashScreen from '../components/SplashScreen';
import FloatingNavbar from '../components/FloatingNavbar';
import HeroSection from '../components/HeroSection';
import DomainsSection from '../components/DomainsSection';
import PrizeSection from '../components/PrizeSection';
import SponsorsSection from '../components/SponsorsSection';
import TimelineSection from '../components/TimelineSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import StickyRegisterButton from '../components/StickyRegisterButton';
import './LandingPage.css';

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="landing-page">
      <CustomCursor />
      
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <FloatingNavbar />
          <HeroSection />
          <DomainsSection />
          <PrizeSection />
          <SponsorsSection />
          <TimelineSection />
          <FAQSection />
          <Footer />
          <StickyRegisterButton />
        </>
      )}
    </div>
  );
};

export default LandingPage;