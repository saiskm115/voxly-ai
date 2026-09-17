import React, { useState } from 'react';
import {
  Brain,
  FileText,
  Globe,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  UploadCloud,
  Layers,
  Bot,
  Zap,
  ArrowDown
} from 'lucide-react';

const KNOWLEDGE_PILLARS = [
  {
    id: 'instructions',
    title: 'Instructions',
    desc: 'Core operational directives, conversational boundaries, tone of voice, and custom sales scripts.',
    items: ['B2B Sales Qualification Script', 'Empathetic Customer Greeting', 'Objection Handling Playbook'],
    icon: FileText,
  },
  {
    id: 'knowledge',
    title: 'Knowledge',
    desc: 'Uploaded product manuals, service offerings, tech specs, pricing matrices, and CRM fields.',
    items: ['Enterprise_Pricing_Matrix_2026.pdf', 'Platform_Architecture_SLA.pdf', 'Product_Manual_v3.pdf'],
    icon: Layers,
  },
  {
    id: 'faqs',
    title: 'FAQs',
    desc: 'Hundreds of curated question-and-answer pairs covering common buyer questions and edge cases.',
    items: ['140 Curated Technical Q&As', 'Competitor Comparison Tables', 'Billing & Refund Rules'],
    icon: HelpCircle,
  },
  {
    id: 'policies',
    title: 'Policies',
    desc: 'Compliance guardrails, Do-Not-Call (DNC) registry rules, HIPAA/SOC2 guidelines, and refund limits.',
    items: ['Zero Hallucination Guardrails', 'TCPA & DNC Scrubbing Rules', 'Escalation Protocol for Disputes'],
    icon: ShieldCheck,
  },
  {
    id: 'personality',
    title: 'Personality',
    desc: 'Humanized conversational rhythm, natural breathing pauses, empathy inflection, and polite affirmations.',
    items: ['Consultative Pacing (145 WPM)', 'Empathetic Active Listening', 'Adaptive Humor & Politeness'],
    icon: Sparkles,
  },
];

export function TrainingSection() {
  const [activePillar, setActivePillar] = useState(0);

  const selected = KNOWLEDGE_PILLARS[activePillar];

  return (
    <section id="train" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Brain & Memory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Teach it how <span className="gradient-text-lavender">your business works.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            Give your agent the knowledge, instructions and behavior it needs to represent your business with absolute precision and zero hallucinations.
          </p>
        </div>

        {/* Central Visual Architecture Diagram */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-[#FAF9FD] rounded-3xl p-6 sm:p-10 border border-[#7657E8]/15 shadow-sm text-center">
            
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#7657E8] block mb-4">
              YOUR BUSINESS CONTEXT
            </span>

            {/* 5 Information Ingestion Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-3xl mx-auto mb-6">
              {KNOWLEDGE_PILLARS.map((p, idx) => {
                const Icon = p.icon;
                const isSelected = activePillar === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(idx)}
                    className={`p-3.5 rounded-2xl border transition-all text-center flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-white border-[#7657E8] shadow-md shadow-[#7657E8]/15 scale-105'
                        : 'bg-white/60 hover:bg-white border-[#7657E8]/15'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${
                      isSelected ? 'bg-[#7657E8] text-white' : 'bg-[#EDE7FF] text-[#7657E8]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#171522]">{p.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Connector Arrow Down */}
            <div className="flex flex-col items-center justify-center my-3">
              <div className="w-0.5 h-6 bg-[#7657E8]/40" />
              <ArrowDown className="w-5 h-5 text-[#7657E8] -mt-1 animate-bounce" />
            </div>

            {/* Target Brain Node: AI EMPLOYEE */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-[#7657E8]/30">
              <Bot className="w-4 h-4" />
              <span>AI EMPLOYEE BRAIN</span>
              <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full">Active Ingestion</span>
            </div>

          </div>
        </div>

        {/* Interactive Ingestion Inspector */}
        <div className="max-w-4xl mx-auto bg-[#171522] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7657E8] text-white flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Ingested Context: {selected.title}
                </h4>
                <p className="text-xs text-white/50">{selected.desc}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#20B486]/20 text-[#20B486] border border-[#20B486]/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Grounded
            </span>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider block">
              Active Documents & Rule Sets:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selected.items.map((item, i) => (
                <div key={i} className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-start gap-2.5">
                  <span className="text-sm">📄</span>
                  <span className="text-xs font-medium text-white/90 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
