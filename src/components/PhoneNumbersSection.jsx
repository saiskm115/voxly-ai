import React, { useState } from 'react';
import {
  Phone,
  Globe,
  UserCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Zap,
  PhoneCall,
  Bot
} from 'lucide-react';
import { PHONE_NUMBERS_DATA } from '../data/siteContent';

export function PhoneNumbersSection({ onGetStarted }) {
  const [selectedNumberType, setSelectedNumberType] = useState(0);

  return (
    <section id="numbers" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Phone className="w-3.5 h-3.5" />
            <span>Dedicated Phone Numbers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Give your AI <span className="gradient-text-lavender">its own number.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            {PHONE_NUMBERS_DATA.subtitle}
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <div className="bg-[#FAF9FD] p-6 sm:p-10 rounded-3xl border border-[#7657E8]/20 shadow-sm">
            
            {/* Top: Phone Number */}
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white border-2 border-[#7657E8] text-[#171522] font-mono font-extrabold text-lg sm:text-xl shadow-md mb-3">
              <Phone className="w-5 h-5 text-[#7657E8]" />
              <span>{PHONE_NUMBERS_DATA.sampleNumber}</span>
            </div>

            {/* Vertical connector */}
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-6 bg-[#7657E8]/40" />
            </div>

            {/* Center: AI Employee */}
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white font-extrabold text-xs uppercase tracking-widest shadow-md mb-3">
              <Bot className="w-4 h-4" />
              <span>AI EMPLOYEE</span>
            </div>

            {/* Split connector */}
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-6 bg-[#7657E8]/40" />
            </div>

            {/* Bottom: Answer Call / Make Call */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-3.5 rounded-2xl bg-white border border-[#7657E8]/20 text-center shadow-xs">
                <span className="text-xs font-extrabold text-[#171522] block">📞 Answer Call</span>
                <span className="text-[11px] text-[#6F6B7D]">Inbound Inquiries</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#7657E8]/20 text-center shadow-xs">
                <span className="text-xs font-extrabold text-[#171522] block">📤 Make Call</span>
                <span className="text-[11px] text-[#6F6B7D]">Outbound Leads</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Number Type Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
          {PHONE_NUMBERS_DATA.numberTypes.map((nt, idx) => {
            const isSelected = selectedNumberType === idx;
            return (
              <div
                key={nt.type}
                onClick={() => setSelectedNumberType(idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF9FD] border-[#7657E8] shadow-lg shadow-[#7657E8]/10 -translate-y-1'
                    : 'bg-white hover:bg-[#FAF9FD]/50 border-[#7657E8]/15'
                }`}
              >
                <span className="text-[11px] font-bold text-[#7657E8] uppercase tracking-wider block mb-1">
                  {nt.region}
                </span>
                <h4 className="text-base font-bold text-[#171522] mb-2">{nt.type}</h4>
                <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed mb-4">{nt.desc}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-[#20B486]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Instant Provisioning Available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* PART 2: AI + Human, Together (Handover Flow) */}
        {/* ================================================================= */}
        <div className="pt-16 border-t border-[#7657E8]/15">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Collaborative Handoff</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#171522] tracking-tight mb-4">
              AI handles the conversation.{' '}
              <span className="gradient-text-lavender">Humans handle the exceptions.</span>
            </h3>
            <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
              {PHONE_NUMBERS_DATA.handoverSubtitle}
            </p>
          </div>

          {/* Decision Tree Diagram */}
          <div className="max-w-4xl mx-auto bg-[#171522] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Node 1: Customer */}
              <div className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold tracking-wider uppercase">
                Customer Calls In
              </div>

              <ArrowDown className="w-4 h-4 text-white/40" />

              {/* Node 2: AI Employee */}
              <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-[#7657E8]/30">
                AI Employee Greets & Understands Request
              </div>

              <ArrowDown className="w-4 h-4 text-white/40" />

              {/* Node 3: Decision Condition */}
              <div className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-[#EDE7FF]">
                Can AI resolve the inquiry?
              </div>

              {/* Branching YES vs NO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-4">
                
                {/* YES BRANCH */}
                <div className="p-6 rounded-2xl bg-[#20B486]/10 border border-[#20B486]/30 text-left">
                  <div className="flex items-center gap-2 text-[#20B486] font-extrabold text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>YES (82% of Calls)</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Instant Resolution (Done)</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Answers questions, books calendar slot, captures lead intent, and updates CRM without any human effort.
                  </p>
                </div>

                {/* NO BRANCH */}
                <div className="p-6 rounded-2xl bg-[#7657E8]/20 border border-[#7657E8]/40 text-left">
                  <div className="flex items-center gap-2 text-[#EDE7FF] font-extrabold text-sm mb-2">
                    <UserCheck className="w-4 h-4 text-[#9B7BF7]" />
                    <span>NO (Complex Exceptions)</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Warm Human Team Transfer</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Instantly routes caller to your human rep with live audio transcript and brief summary so customer never repeats themselves.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
