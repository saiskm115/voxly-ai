import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveBuilder } from './components/InteractiveBuilder';
import { TrainingSection } from './components/TrainingSection';
import { InteractiveCallSimulator } from './components/InteractiveCallSimulator';
import { AnalyticsSection } from './components/AnalyticsSection';
import { PlatformGrid } from './components/PlatformGrid';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WatchDemoModal } from './components/WatchDemoModal';
import { TalkToMeModal } from './components/TalkToMeModal';

export function App() {
  const [botState, setBotState] = useState('IDLE');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const botControllerRef = useRef(null);

  // Section scroll observer to subtly synchronize 3D bot states with narrative sections
  useEffect(() => {
    const handleScroll = () => {
      // Don't override if a modal is active
      if (isDemoModalOpen || isTalkModalOpen) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const builderEl = document.getElementById('builder');
      const trainEl = document.getElementById('train');
      const simulatorEl = document.getElementById('simulator');
      const platformEl = document.getElementById('platform');
      const pricingEl = document.getElementById('pricing');

      // Subtle reactive updates when sections enter viewport
      if (pricingEl && scrollY > pricingEl.offsetTop - windowHeight * 0.5) {
        // Near bottom
      } else if (simulatorEl && scrollY > simulatorEl.offsetTop - windowHeight * 0.5) {
        // Simulator section
      } else if (trainEl && scrollY > trainEl.offsetTop - windowHeight * 0.5) {
        // Train section
      } else if (builderEl && scrollY > builderEl.offsetTop - windowHeight * 0.5) {
        // Builder section
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDemoModalOpen, isTalkModalOpen]);

  const handleGetStarted = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName) => {
    alert(`Thank you for selecting the ${planName} plan! In production, this redirects to your billing checkout or onboarding dashboard.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] selection:bg-[#EDE7FF] selection:text-[#7657E8]">
      {/* Navigation Header */}
      <Navbar
        onGetStarted={handleGetStarted}
        onWatchDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Hero Section with Live Three.js Bot Canvas */}
      <Hero
        botState={botState}
        setBotState={setBotState}
        onTalkToMe={() => setIsTalkModalOpen(true)}
        onWatchDemo={() => setIsDemoModalOpen(true)}
        onGetStarted={handleGetStarted}
        botControllerRef={botControllerRef}
        isModalOpen={isDemoModalOpen || isTalkModalOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <InteractiveBuilder
          onSelectBotState={(state) => setBotState(state)}
        />

        <TrainingSection />

        <InteractiveCallSimulator
          onSelectBotState={(state) => setBotState(state)}
        />

        <AnalyticsSection />

        <PlatformGrid />

        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        <FAQSection />

        <FinalCTA
          onGetStarted={handleGetStarted}
          onTalkToMe={() => setIsTalkModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WatchDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectBotState={(st) => setBotState(st)}
      />

      <TalkToMeModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        onSelectBotState={(st) => setBotState(st)}
      />
    </div>
  );
}

export default App;
