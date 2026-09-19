import React, { useState, useRef, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './console/context/WorkspaceContext';
import { AppShell } from './console/AppShell';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiEmployeeSection } from './components/AiEmployeeSection';
import { TalkToAiSection } from './components/TalkToAiSection';
import { PhoneChannelsSection } from './components/PhoneChannelsSection';
import { LeadEngineSection } from './components/LeadEngineSection';
import { CampaignScaleSection } from './components/CampaignScaleSection';
import { TrainingSection } from './components/TrainingSection';
import { AiTeamSection } from './components/AiTeamSection';
import { ConversationHistorySection } from './components/ConversationHistorySection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WatchDemoModal } from './components/WatchDemoModal';
import { TalkToMeModal } from './components/TalkToMeModal';
import { LegalModals } from './components/LegalModals';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#dashboard')) {
      return 'dashboard';
    }
    return 'landing';
  });

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [legalModalTab, setLegalModalTab] = useState('privacy');
  const botControllerRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#dashboard')) {
        setCurrentView('dashboard');
      } else if (!window.location.hash || window.location.hash === '#' || !window.location.hash.includes('dashboard')) {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenSignIn = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setCurrentView('dashboard');
    window.location.hash = '#dashboard/employees';
  };

  const handleSelectPlan = (planName) => {
    setCurrentView('dashboard');
    window.location.hash = '#dashboard/billing';
  };

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <AuthProvider>
      <WorkspaceProvider>
        {currentView === 'dashboard' ? (
          <AppShell
            onBackToLanding={() => {
              setCurrentView('landing');
              window.location.hash = '';
            }}
          />
        ) : (
          <div className="min-h-screen flex flex-col bg-[#FAF9FD] selection:bg-[#F0EEF6] selection:text-[#6344E7]">
            {/* Navigation Header */}
            <Navbar
              onGetStarted={handleGetStarted}
              onWatchDemo={() => setIsDemoModalOpen(true)}
              onSignIn={() => handleOpenSignIn('signin')}
              onOpenDashboard={(tab) => {
                setCurrentView('dashboard');
                window.location.hash = tab ? `#dashboard/${tab}` : '#dashboard';
              }}
            />

      {/* Main Content Sections: Streamlined, Intuitive User Architecture */}
      <main className="flex-1">
        {/* 01: Hero — AI Voice Agent & 3D Interactive Mascot */}
        <Hero
          onTalkToMe={() => setIsTalkModalOpen(true)}
          onWatchDemo={() => setIsDemoModalOpen(true)}
          onGetStarted={handleGetStarted}
          botControllerRef={botControllerRef}
          isModalOpen={isDemoModalOpen || isTalkModalOpen}
        />

        {/* 02: Immediate Live Voice Lab & Speech Acoustic Player */}
        <TalkToAiSection
          onOpenTalkModal={() => setIsTalkModalOpen(true)}
        />

        {/* 03: Autonomous AI Workforce Fleet (Sales, Support, Receptionist, Follow-up) */}
        <AiTeamSection
          onGetStarted={handleGetStarted}
        />

        {/* 04: Fast Setup & Production Telephony Onboarding (5 Steps) */}
        <HowItWorksSection
          onGetStarted={handleGetStarted}
        />

        {/* 05: Telephony Channels (Inbound 24/7, Outbound SDR, Virtual DIDs) */}
        <PhoneChannelsSection
          onGetStarted={handleGetStarted}
        />

        {/* 06: Core Capabilities & Visual Agent Builder */}
        <AiEmployeeSection
          onGetStarted={handleGetStarted}
        />

        {/* 07: Autonomous Lead Qualification Engine (BANT Deals & Pipeline) */}
        <LeadEngineSection
          onGetStarted={handleGetStarted}
        />

        {/* 08: Bulk Outbound Campaigns at Scale (Dialing Engine) */}
        <CampaignScaleSection
          onGetStarted={handleGetStarted}
        />

        {/* 09: Train Your AI (Knowledge Base, SOP Documents & AI Brain) */}
        <TrainingSection />

        {/* 10: Call History & Diarized Transcript Inspector */}
        <ConversationHistorySection />

        {/* 11: Operational Intelligence Dashboard (12k+ Calls & Telemetry) */}
        <AnalyticsSection />

        {/* 12: Vertical Industry Playbooks (Healthcare, Finance, Real Estate, SaaS) */}
        <IndustriesSection
          onGetStarted={handleGetStarted}
        />

        {/* 13: Transparent Economics & Fleet Pricing */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        {/* 14: Frequently Asked Questions */}
        <FAQSection />

        {/* 15: Executive Call to Action */}
        <FinalCTA
          onGetStarted={handleGetStarted}
          onTalkToMe={() => setIsTalkModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Modals */}
      <WatchDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectBotState={(st) => botControllerRef.current?.setState(st)}
      />

      <TalkToMeModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        onSelectBotState={(st) => botControllerRef.current?.setState(st)}
      />

      <LegalModals
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authModalMode}
          onAuthSuccess={() => {
            setCurrentView('dashboard');
            window.location.hash = '#dashboard';
          }}
        />
      </div>
        )}
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
