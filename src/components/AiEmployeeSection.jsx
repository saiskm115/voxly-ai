import React, { useState } from 'react';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Sparkles,
  CheckCircle2,
  Calendar,
  RotateCcw,
  HelpCircle,
  UserCheck,
  ArrowRight,
  Bot,
  Mic,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Play,
  Volume2
} from 'lucide-react';
import { AI_EMPLOYEE_CAPABILITIES, BUILD_AI_EMPLOYEE_STEPS } from '../data/siteContent';

const ICONS = {
  PhoneIncoming,
  PhoneOutgoing,
  Sparkles,
  CheckCircle2,
  Calendar,
  RotateCcw,
  HelpCircle,
  UserCheck,
};

export function AiEmployeeSection({ onGetStarted }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCapability, setSelectedCapability] = useState(0);

  const stepPreviews = [
    {
      title: "Senior Inbound Lead Specialist",
      role: "Maya Chen • Lead Qualification Specialist",
      instructions: "Greet caller, identify company size, qualify budget >$25k, and propose demo slot with account executive.",
      voice: "Alloy Warm (Female, 310ms latency)",
      knowledge: ["Acme_Product_Catalog_2026.pdf", "Pricing_Matrix_Enterprise.xlsx", "FAQ_Knowledge_Base.url"],
      tools: ["Salesforce CRM Sync", "Google Calendar Booking", "Slack Alert #leads"],
      status: "Configuring Role",
    },
    {
      title: "Instruction & Tone Engineering",
      role: "Empathetic, consultative, decisive",
      instructions: "Never talk over caller. Acknowledge objections with 'I understand that timeline is tight...' before offering solution.",
      voice: "Alloy Warm (Cadence 1.05x)",
      knowledge: ["Objection_Playbook_v4.pdf", "Competitive_Battlecard.pdf"],
      tools: ["Webhook Telemetry", "Sentiment Real-Time Scoring"],
      status: "Synthesizing Prompts",
    },
    {
      title: "Voice & Accent Selection",
      role: "40+ Neural High-Fidelity Voices",
      instructions: "Accent: Neutral American • Pacing: Natural 148 wpm • Breathing & micro-pauses active",
      voice: "Elena Smooth (Studio Quality • 48kHz)",
      knowledge: ["Pronunciation_Glossary_Tech.json"],
      tools: ["Opus Codec Direct Audio Stream"],
      status: "Voice Configured",
    },
    {
      title: "Enterprise Knowledge Grounding",
      role: "Zero Hallucination Guaranteed",
      instructions: "Answer strictly based on ingested knowledge. If price tier is unlisted, offer sales specialist callback.",
      voice: "Elena Smooth",
      knowledge: ["Enterprise_SLA_Terms.pdf", "Security_Compliance_SOC2.pdf", "Product_API_v3_Docs.url"],
      tools: ["Vector Embeddings Search (Hybrid RAG)"],
      status: "Knowledge Ingested (3,420 pages)",
    },
    {
      title: "Tool Connectors & API Webhooks",
      role: "Real-Time Bidirectional Data Sync",
      instructions: "POST https://api.yourcompany.com/lead-qualified on successful call disposition.",
      voice: "Elena Smooth",
      knowledge: ["HubSpot 2-Way Sync", "Twilio SIP Trunk", "PostgreSQL Database"],
      tools: ["Sub-50ms Webhook Execution"],
      status: "Connected (All 4 green)",
    },
    {
      title: "Live Production Deployment",
      role: "Phone Line +1 (800) 529-VOXLY",
      instructions: "Ready to answer calls concurrently across 10,000+ lines with 99.99% uptime SLA.",
      voice: "Elena Smooth (Active Live)",
      knowledge: ["Fleet Auto-Scaling Enabled"],
      tools: ["Live Call Telemetry Dashboard"],
      status: "Live & Taking Calls (Ready)",
    },
  ];

  const currentPreview = stepPreviews[activeStep];

  return (
    <section id="capabilities" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#7657E8]/10 via-[#EDE7FF]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* PART 1: What Can Your AI Employee Do? */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Employee Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            More than a voice bot.{' '}
            <span className="block gradient-text-lavender">Your AI employee.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            Voxly doesn't just read scripts. It understands context, remembers customer history, makes autonomous decisions, and completes real business tasks over the phone.
          </p>
        </div>

        {/* 8 Capability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {AI_EMPLOYEE_CAPABILITIES.map((cap, idx) => {
            const IconComponent = ICONS[cap.icon] || Bot;
            const isSelected = selectedCapability === idx;

            return (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(idx)}
                className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#7657E8] shadow-xl shadow-[#7657E8]/12 -translate-y-1'
                    : 'bg-white/80 hover:bg-white border-[#7657E8]/15 hover:border-[#7657E8]/40 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Top icon and badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#7657E8] text-white'
                        : 'bg-[#EDE7FF] text-[#7657E8] group-hover:bg-[#7657E8] group-hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EDE7FF]/60 text-[#7657E8] border border-[#7657E8]/10">
                    {cap.badge}
                  </span>
                </div>

                {/* Title and description */}
                <h3 className="text-lg font-bold text-[#171522] mb-2 group-hover:text-[#7657E8] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed mb-4">
                  {cap.desc}
                </p>

                {/* Micro highlight tag */}
                <div className="pt-3 border-t border-[#171522]/5 flex items-center gap-1.5 text-xs font-semibold text-[#7657E8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{cap.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* PART 2: Build Your AI Employee in Minutes */}
        {/* ================================================================= */}
        <div id="build" className="pt-8 border-t border-[#7657E8]/15">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>Studio Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
              Create an AI employee <span className="gradient-text-lavender">in minutes.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
              From defining its persona and tone to connecting live phone lines and CRM webhooks, build your custom voice workforce through a simple visual studio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT COLUMN: Interactive Agent Studio Dashboard Mockup */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-[#171522] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Top window bar */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <span className="text-xs font-mono text-white/50 ml-2">voxly-studio / agent-config</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B486] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#20B486]"></span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#20B486]">
                      {currentPreview.status}
                    </span>
                  </div>
                </div>

                {/* Agent Identity Card */}
                <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7657E8] to-[#9B7BF7] flex items-center justify-center text-xl shadow-md">
                        🤖
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          {currentPreview.title}
                        </h4>
                        <p className="text-xs text-white/60">
                          {currentPreview.role}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#7657E8]/20 text-[#EDE7FF] border border-[#7657E8]/40">
                      Step {activeStep + 1} of 6
                    </span>
                  </div>

                  {/* Dynamic Active Step Parameter Box */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase font-bold tracking-wider mb-1">
                        Active Prompt & Guidelines:
                      </span>
                      <p className="font-mono text-[#EDE7FF] bg-black/30 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                        "{currentPreview.instructions}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                        <span className="text-white/40 text-[10px] uppercase font-bold block mb-1">Neural Voice:</span>
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-[#7657E8]" />
                          {currentPreview.voice}
                        </span>
                      </div>
                      <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                        <span className="text-white/40 text-[10px] uppercase font-bold block mb-1">Telemetry Latency:</span>
                        <span className="text-[#20B486] font-semibold flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          320ms Round-Trip
                        </span>
                      </div>
                    </div>

                    {/* Attached Knowledge & Tools */}
                    <div className="pt-2">
                      <span className="text-white/40 text-[10px] uppercase font-bold block mb-1.5">Active Ingested Context:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPreview.knowledge.map((item, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/5">
                            📄 {item}
                          </span>
                        ))}
                        {currentPreview.tools.map((tool, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7657E8]/20 text-[#EDE7FF] border border-[#7657E8]/30">
                            ⚡ {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Waveform Simulation Bar */}
                <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-[#7657E8] text-white flex items-center justify-center hover:bg-[#6A47E5] transition-colors shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                    <span className="text-xs font-semibold text-white/80">Test Voice Synthesis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[16, 28, 12, 36, 20, 32, 14, 24, 38, 18, 26, 12].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#7657E8] rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 6 Step Roadmap */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-3.5">
              {BUILD_AI_EMPLOYEE_STEPS.map((stepItem, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={stepItem.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex items-start gap-4 ${
                      isActive
                        ? 'bg-white border-[#7657E8] shadow-lg shadow-[#7657E8]/10 scale-[1.01]'
                        : 'bg-white/60 hover:bg-white border-[#7657E8]/15 hover:border-[#7657E8]/30'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-extrabold text-sm transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white shadow-sm'
                          : 'bg-[#EDE7FF] text-[#7657E8]'
                      }`}
                    >
                      {stepItem.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`text-base font-bold transition-colors ${isActive ? 'text-[#7657E8]' : 'text-[#171522]'}`}>
                          {stepItem.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-[#6F6B7D] bg-[#171522]/5 px-2 py-0.5 rounded-full">
                          {stepItem.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Call to action */}
              <div className="pt-4">
                <button
                  onClick={onGetStarted}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-md shadow-[#7657E8]/30 hover:shadow-lg hover:shadow-[#7657E8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>Create your AI employee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
