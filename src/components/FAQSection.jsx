import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { FAQS } from '../data/siteContent';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to"
          highlight="Know About Voxly"
          subtitle="Answers to common technical, compliance, and deployment questions."
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FAF9FD] border-[#7657E8]/30 shadow-md shadow-[#7657E8]/5'
                    : 'bg-white border-[#7657E8]/12 hover:border-[#7657E8]/25'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#171522]">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#EDE7FF] flex items-center justify-center text-[#7657E8] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#7657E8] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-[#6F6B7D] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="pt-2 border-t border-[#7657E8]/10">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
