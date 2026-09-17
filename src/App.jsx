import React, { useState, useRef } from 'react';
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
import { PhoneNumbersSection } from './components/PhoneNumbersSection';
import { IndustriesSection } from './components/IndustriesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
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

  const handleGetStarted = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName) => {
    alert(`Thank you for selecting the ${planName} plan! In production, this redirects to your onboarding workspace.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] selection:bg-[#EDE7FF] selection:text-[#7657E8]">
      {/* Navigation Header */}
      <Navbar
        onGetStarted={handleGetStarted}
        onWatchDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Sections: Exact 16-Stage Ordered Architecture */}
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

        {/* 11: Phone Numbers & AI + Human Handover */}
        <PhoneNumbersSection
          onGetStarted={handleGetStarted}
        />

        {/* 12: Industries / Use Cases (6 Vertical Solutions) */}
        <IndustriesSection
          onGetStarted={handleGetStarted}
        />

        {/* 13: Simple Setup (5 Steps) & Transparent Usage Billing */}
        <HowItWorksSection
          onGetStarted={handleGetStarted}
        />

        {/* 14: Pricing (Plans & Minutes) */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        {/* 15: Frequently Asked Questions */}
        <FAQSection />

        {/* 16: Final Call to Action */}
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
