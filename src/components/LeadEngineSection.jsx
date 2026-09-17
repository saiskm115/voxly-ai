import React, { useState } from 'react';
import {
  Target,
  Filter,
  FolderKanban,
  Send,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  User,
  Building,
  DollarSign,
  Tag
} from 'lucide-react';
import { LEAD_PIPELINE } from '../data/siteContent';

const ICONS = {
  Target,
  Filter,
  FolderKanban,
  Send,
};

export function LeadEngineSection({ onGetStarted }) {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="leads" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Target className="w-3.5 h-3.5" />
            <span>Lead Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Every conversation{' '}
            <span className="gradient-text-lavender">can become an opportunity.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            {LEAD_PIPELINE.subtitle}
          </p>
        </div>

        {/* Pipeline Stepper Visual: CALL -> CONVERSATION -> INTENT -> QUALIFIED LEAD -> FOLLOW-UP */}
        <div className="mb-16">
          <div className="bg-[#FAF9FD] rounded-3xl p-6 sm:p-8 border border-[#7657E8]/15 shadow-sm max-w-5xl mx-auto">
            <span className="text-[11px] font-bold text-[#7657E8] uppercase tracking-wider block text-center mb-6">
              Autonomous Conversion Pipeline
            </span>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative">
              {LEAD_PIPELINE.stages.map((stage, idx) => (
                <React.Fragment key={stage}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#7657E8] flex items-center justify-center font-extrabold text-sm text-[#7657E8] shadow-sm mb-2">
                      0{idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-[#171522] tracking-wide">
                      {stage}
                    </span>
                  </div>

                  {idx < LEAD_PIPELINE.stages.length - 1 && (
                    <div className="hidden md:flex items-center text-[#7657E8]/40">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Cards: Capture, Qualify, Organize, Follow Up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {LEAD_PIPELINE.cards.map((card, idx) => {
            const Icon = ICONS[card.icon] || Target;
            const isSelected = activeCard === idx;

            return (
              <div
                key={card.title}
                onClick={() => setActiveCard(idx)}
                className={`p-6 rounded-2xl cursor-pointer border transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#FAF9FD] border-[#7657E8] shadow-lg shadow-[#7657E8]/10 -translate-y-1'
                    : 'bg-white hover:bg-[#FAF9FD]/50 border-[#7657E8]/15 hover:border-[#7657E8]/40'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-[#171522] mb-1">
                  {card.title}
                </h3>
                <h4 className="text-xs font-bold text-[#7657E8] uppercase tracking-wider mb-2">
                  {card.desc}
                </h4>
                <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed mb-4">
                  {card.detail}
                </p>
                <div className="pt-3 border-t border-[#171522]/5 flex items-center gap-1 text-xs font-bold text-[#20B486]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{card.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Extracted Lead Card Preview Mockup */}
        <div className="max-w-3xl mx-auto bg-[#171522] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#20B486]/20 text-[#20B486] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Live Lead Extracted & Synchronized</h4>
                <p className="text-[11px] text-white/50">Auto-created 12 seconds ago via Call #2841</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7657E8] text-white shadow-sm">
              {LEAD_PIPELINE.sampleLead.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/40 block text-[10px] font-bold uppercase mb-1">Decision Maker:</span>
              <span className="text-white font-semibold text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-[#7657E8]" />
                {LEAD_PIPELINE.sampleLead.name} ({LEAD_PIPELINE.sampleLead.role})
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/40 block text-[10px] font-bold uppercase mb-1">Target Account:</span>
              <span className="text-white font-semibold text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-[#7657E8]" />
                {LEAD_PIPELINE.sampleLead.company}
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/40 block text-[10px] font-bold uppercase mb-1">Detected Intent:</span>
              <span className="text-[#EDE7FF] font-medium leading-relaxed block">
                "{LEAD_PIPELINE.sampleLead.intent}"
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-white/40 block text-[10px] font-bold uppercase mb-1">Verified Budget:</span>
              <span className="text-[#20B486] font-bold text-sm flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                {LEAD_PIPELINE.sampleLead.budget}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
