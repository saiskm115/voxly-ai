import React from 'react';
import { ArrowRight, Mic, Sparkles } from 'lucide-react';

export function FinalCTA({ onGetStarted, onTalkToMe }) {
  return (
    <section className="py-24 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#171522] via-[#241E3B] to-[#4C3A91] p-10 sm:p-16 text-center text-white shadow-2xl shadow-[#7657E8]/20 overflow-hidden">
          
          {/* Subtle decorative background glow circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#7657E8]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#9B7BF7]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#EDE7FF] text-xs font-bold tracking-widest uppercase mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#9B7BF7]" />
              <span>Scale Your Workforce Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6">
              Your next employee <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDE7FF] via-[#B18CFE] to-[#9B7BF7]">
                doesn't need a desk.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#EDE7FF]/80 leading-relaxed mb-10">
              Deploy AI voice employees that work around the clock, never miss a call, and qualify opportunities at scale.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6B46E5] hover:to-[#8E6DF5] shadow-lg shadow-[#7657E8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTalkToMe}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Mic className="w-4 h-4 text-[#B18CFE]" />
                <span>Talk to an AI Employee</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
