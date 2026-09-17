import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { PRICING_TIERS } from '../data/siteContent';
import { Check, ArrowRight } from 'lucide-react';
import { analytics } from '../services/analytics';

export function PricingSection({ onSelectPlan }) {
  const [annual, setAnnual] = useState(true);

  const handlePlanClick = (tierName) => {
    analytics.trackPlanSelected(tierName);
    if (onSelectPlan) {
      onSelectPlan(tierName);
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="Predictable Metering"
          title="Transparent Plans for Every"
          highlight="Fleet Size"
          subtitle="No telephony markup or rounding up to the nearest minute. Pay flat monthly platform subscriptions plus ultra-low per-second rates."
        />

        {/* Monthly vs Annual Segmented Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="inline-flex p-1 rounded-xl bg-[#F0EEF6] border border-[#E4E2EB]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !annual
                  ? 'bg-white text-[#0F0E17] shadow-craft-xs'
                  : 'text-[#524E5E] hover:text-[#0F0E17]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                annual
                  ? 'bg-white text-[#0F0E17] shadow-craft-xs'
                  : 'text-[#524E5E] hover:text-[#0F0E17]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#0F0E17] text-white">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-150 relative text-left ${
                  tier.highlighted
                    ? 'bg-white border-2 border-[#0F0E17] shadow-craft-md -translate-y-1'
                    : 'bg-white border border-[#E4E2EB] shadow-craft-xs hover:border-[#D1CFDB]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0F0E17] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-xs">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6344E7] mb-1">
                    {tier.badge}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F0E17] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#524E5E] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#E4E2EB]">
                    <span className="text-4xl font-extrabold text-[#0F0E17] tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs font-semibold text-[#524E5E]">/ month</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-mono font-bold text-[#524E5E] uppercase tracking-wider block">
                      Plan Inclusions:
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F0E17]">
                        <div className="w-4 h-4 rounded-full bg-[#FAF9FD] border border-[#E4E2EB] flex items-center justify-center shrink-0 mt-0.5 text-[#10B981]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handlePlanClick(tier.name)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                    tier.highlighted
                      ? 'bg-[#0F0E17] hover:bg-[#232130] text-white shadow-xs'
                      : 'bg-[#FAF9FD] hover:bg-[#F0EEF6] border border-[#E4E2EB] text-[#0F0E17]'
                  }`}
                >
                  <span>Build Your Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
