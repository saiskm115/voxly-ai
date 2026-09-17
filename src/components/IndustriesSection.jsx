import React, { useState } from 'react';
import {
  TrendingUp,
  Headphones,
  Building2,
  Stethoscope,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/siteContent';

const INDUSTRY_ICONS = {
  TrendingUp,
  Headphones,
  Building2,
  Stethoscope,
  ShieldCheck,
  ShoppingBag,
};

export function IndustriesSection({ onGetStarted }) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  return (
    <section id="industries" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Vertical Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            One AI platform.{' '}
            <span className="gradient-text-lavender">Every conversation.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            Tailored voice models, domain vocabularies, and regulatory compliance built for high-performing organizations across every industry.
          </p>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const Icon = INDUSTRY_ICONS[ind.icon] || Briefcase;
            const isSelected = selectedIndustry === idx;

            return (
              <div
                key={ind.id}
                onClick={() => setSelectedIndustry(idx)}
                className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#7657E8] shadow-xl shadow-[#7657E8]/12 -translate-y-1'
                    : 'bg-white/80 hover:bg-white border-[#7657E8]/15 hover:border-[#7657E8]/40 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#20B486] bg-[#20B486]/10 px-3 py-1 rounded-full">
                      {ind.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#171522] mb-1">
                    {ind.title}
                  </h3>
                  <h4 className="text-xs font-bold text-[#7657E8] mb-3">
                    {ind.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed mb-6">
                    {ind.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#171522]/5">
                    {ind.examples.map((ex, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#171522]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7657E8] flex-shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#171522]/5">
                  <button
                    onClick={onGetStarted}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#7657E8] bg-[#EDE7FF] hover:bg-[#7657E8] hover:text-white transition-all"
                  >
                    <span>Deploy {ind.title} Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
