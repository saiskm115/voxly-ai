import React from 'react';
import { SectionHeading } from './SectionHeading';
import { PLATFORM_PILLARS } from '../data/siteContent';
import { Check, ShieldCheck, Globe2, Receipt, Code2, Sparkles } from 'lucide-react';

const ICONS = [Globe2, ShieldCheck, Receipt, Code2];

export function PlatformGrid() {
  return (
    <section id="platform" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="ENTERPRISE FOUNDATION"
          title="Enterprise-Ready Telephony &"
          highlight="Platform Scale"
          subtitle="Everything your revenue operations, security council, and telephony engineers require for compliance and mission-critical reliability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PLATFORM_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={pillar.title}
                className="bg-[#FAF9FD] rounded-3xl p-7 sm:p-8 border border-[#7657E8]/12 hover:border-[#7657E8]/30 shadow-sm hover:shadow-xl hover:shadow-[#7657E8]/8 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] group-hover:bg-[#7657E8] text-[#7657E8] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#7657E8] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#7657E8]/15">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#171522] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6F6B7D] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#7657E8]/10 space-y-2.5">
                  {pillar.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-[#171522]">
                      <div className="w-4 h-4 rounded-full bg-[#20B486]/15 text-[#20B486] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
