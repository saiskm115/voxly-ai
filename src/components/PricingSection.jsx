import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { PRICING_TIERS } from '../data/siteContent';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export function PricingSection({ onSelectPlan }) {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="SIMPLE PREDICTABLE PRICING"
          title="Transparent Plans for Every"
          highlight="Fleet Size"
          subtitle="No hidden telephony surprises. Pay flat predictable monthly platform subscriptions plus ultra-low per-second voice minutes."
        />

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-bold ${!annual ? 'text-[#171522]' : 'text-[#6F6B7D]'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 rounded-full bg-[#EDE7FF] p-1 relative border border-[#7657E8]/20 transition-colors"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-6 h-6 rounded-full bg-[#7657E8] transition-transform duration-200 shadow-sm ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${annual ? 'text-[#171522]' : 'text-[#6F6B7D]'}`}>
              Annual Billing
            </span>
            <span className="text-[11px] font-extrabold uppercase bg-[#7657E8] text-white px-2.5 py-0.5 rounded-full shadow-xs">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.highlighted
                    ? 'bg-white border-2 border-[#7657E8] shadow-2xl shadow-[#7657E8]/15 -translate-y-2'
                    : 'bg-white/80 hover:bg-white border border-[#7657E8]/12 shadow-sm hover:shadow-lg'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white text-xs font-extrabold uppercase px-4 py-1 rounded-full shadow-md shadow-[#7657E8]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7657E8] mb-1">
                    {tier.badge}
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#171522] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#6F6B7D] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#7657E8]/10">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#171522]">
                      ${price}
                    </span>
                    <span className="text-sm font-semibold text-[#6F6B7D]">/ month</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block">
                      Included with plan:
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-[#171522]">
                        <div className="w-4 h-4 rounded-full bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(tier.name)}
                  className={`w-full py-3.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] text-white shadow-md shadow-[#7657E8]/30'
                      : 'bg-[#EDE7FF] hover:bg-[#DCD1FD] text-[#4C3A91]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
