import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS, BILLING_USAGE_PREVIEW } from '../data/siteContent';

export function HowItWorksSection({ onGetStarted }) {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Simple 5-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            From idea to AI employee{' '}
            <span className="gradient-text-lavender">in minutes.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            No complex developer setups or telephony hardware required. Get your first AI employee live and talking to customers in five simple steps.
          </p>
        </div>

        {/* 5-Step Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-20">
          {HOW_IT_WORKS_STEPS.map((st, idx) => (
            <div
              key={st.step}
              className="bg-[#FAF9FD] p-6 rounded-3xl border border-[#7657E8]/15 hover:border-[#7657E8]/40 hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center font-extrabold text-base mb-4 shadow-xs">
                  {st.step}
                </div>
                <h4 className="text-base font-extrabold text-[#171522] mb-2">
                  {st.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#7657E8]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* Simple Usage & Billing Widget */}
        {/* ================================================================= */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#171522] to-[#25203B] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7657E8] text-white flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {BILLING_USAGE_PREVIEW.headline}
                </h3>
                <p className="text-xs text-[#20B486] font-semibold">
                  {BILLING_USAGE_PREVIEW.tagline}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/10">
              ⚡ {BILLING_USAGE_PREVIEW.billingPerSec}
            </span>
          </div>

          {/* 4 Usage Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                Allocated Credits
              </span>
              <span className="text-2xl font-extrabold text-white">
                {BILLING_USAGE_PREVIEW.credits}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                Minutes Used
              </span>
              <span className="text-2xl font-extrabold text-[#EDE7FF]">
                {BILLING_USAGE_PREVIEW.minutesUsed}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                Current Spend
              </span>
              <span className="text-2xl font-extrabold text-[#20B486]">
                {BILLING_USAGE_PREVIEW.currentUsage}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                Remaining
              </span>
              <span className="text-2xl font-extrabold text-[#7657E8]">
                {BILLING_USAGE_PREVIEW.remainingMinutes}
              </span>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
            <span className="text-white/70">
              Never pay for unanswered rings, voicemails, or dead air. You are billed strictly per connected second.
            </span>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#7657E8] hover:bg-[#6A47E5] shadow-md transition-all"
            >
              <span>Explore Pricing & Credits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
