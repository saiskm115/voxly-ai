import React, { useState, useRef } from 'react';
import { AuthProvider } from './context/AuthContext';
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
  const [botState, setBotState] = useState('IDLE');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [legalModalTab, setLegalModalTab] = useState('privacy');
  const botControllerRef = useRef(null);

  const handleOpenSignIn = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    handleOpenSignIn('signup');
  };

  const handleSelectPlan = (planName) => {
    handleOpenSignIn('signup');
  };

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9FD] selection:bg-[#F0EEF6] selection:text-[#6344E7]">
        {/* Navigation Header */}
        <Navbar
          onGetStarted={handleGetStarted}
          onWatchDemo={() => setIsDemoModalOpen(true)}
          onSignIn={() => handleOpenSignIn('signin')}
        />

      {/* Main Content Sections: Exact 15-Stage Ordered Architecture */}
      <main className="flex-1">
        {/* 01: Hero — AI Voice Agent */}
        <Hero
          botState={botState}
          setBotState={setBotState}
          onTalkToMe={() => setIsTalkModalOpen(true)}
          onWatchDemo={() => setIsDemoModalOpen(true)}
          onGetStarted={handleGetStarted}
          botControllerRef={botControllerRef}
          isModalOpen={isDemoModalOpen || isTalkModalOpen}
        />

        {/* 02: What Can Your AI Employee Do? & Build in Minutes */}
        <AiEmployeeSection
          onGetStarted={handleGetStarted}
        />

        {/* 03: Talk to Your AI (Live Audio & Architecture) */}
        <TalkToAiSection
          onOpenTalkModal={() => setIsTalkModalOpen(true)}
        />

        {/* 04: AI That Actually Works on the Phone (Inbound, Outbound, Campaigns) */}
        <PhoneChannelsSection
          onGetStarted={handleGetStarted}
        />

        {/* 05: Turn Calls Into Leads (Pipeline & Intelligence) */}
        <LeadEngineSection
          onGetStarted={handleGetStarted}
        />

        {/* 06: Run Campaigns at Scale (Bulk Dialing Engine) */}
        <CampaignScaleSection
          onGetStarted={handleGetStarted}
        />

        {/* 07: Train Your AI (Business Knowledge & AI Brain) */}
        <TrainingSection />

        {/* 08: Build an AI Team (Sales, Support, Receptionist, Follow-up) */}
        <AiTeamSection
          onGetStarted={handleGetStarted}
        />

        {/* 09: Conversations & Call History (Transcripts & Sentiment) */}
        <ConversationHistorySection />

        {/* 10: AI Performance Dashboard (12k+ Calls & Telemetry) */}
        <AnalyticsSection />

        {/* 11: Industries / Use Cases (6 Vertical Solutions) */}
        <IndustriesSection
          onGetStarted={handleGetStarted}
        />

        {/* 12: Simple Setup (5 Steps) & Transparent Usage Billing */}
        <HowItWorksSection
          onGetStarted={handleGetStarted}
        />

        {/* 13: Pricing (Plans & Minutes) */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        {/* 14: Frequently Asked Questions */}
        <FAQSection />

        {/* 15: Final Call to Action */}
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
        onSelectBotState={(st) => setBotState(st)}
      />

      <TalkToMeModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        onSelectBotState={(st) => setBotState(st)}
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
      />
    </div>
  </AuthProvider>
  );
}

export default App;
