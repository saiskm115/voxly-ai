import React from 'react';
import { ArrowRight, Mic, Sparkles, Bot } from 'lucide-react';

export function FinalCTA({ onGetStarted, onTalkToMe }) {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#171522] via-[#241E3B] to-[#4C3A91] p-8 sm:p-16 text-center text-white shadow-2xl shadow-[#7657E8]/20 overflow-hidden">
          
          {/* Subtle decorative background glow circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#7657E8]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#9B7BF7]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Robot mascot avatar circle */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7657E8] to-[#9B7BF7] mx-auto flex items-center justify-center text-3xl shadow-xl shadow-[#7657E8]/40 mb-6 border border-white/20">
              🤖
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#EDE7FF] text-xs font-bold tracking-widest uppercase mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#9B7BF7]" />
              <span>Bring Voxly to Your Team</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5">
              Build your AI employee{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDE7FF] via-[#B18CFE] to-[#9B7BF7]">
                today.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#EDE7FF]/80 leading-relaxed mb-10 max-w-xl mx-auto">
              Give your business an AI that can talk, listen, learn and work around the clock.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6B46E5] hover:to-[#8E6DF5] shadow-lg shadow-[#7657E8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Build Your Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTalkToMe}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Mic className="w-4 h-4 text-[#B18CFE]" />
                <span>Talk to AI</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
