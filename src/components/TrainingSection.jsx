import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { FileText, Globe, HelpCircle, ShieldAlert, Sparkles, Check, UploadCloud, RefreshCw } from 'lucide-react';

const KNOWLEDGE_SOURCES = [
  {
    icon: FileText,
    title: "Product Specs & Pricing PDFs",
    size: "14 documents (4.8 MB)",
    status: "Synced & Indexed",
    items: ["Enterprise_Pricing_Matrix_Q3.pdf", "SLA_Terms_and_Conditions.pdf", "Product_Feature_Guide_v4.pdf"],
  },
  {
    icon: Globe,
    title: "Live URL Web Crawler",
    size: "128 pages crawled",
    status: "Auto-syncs daily",
    items: ["https://docs.acme.com/api", "https://acme.com/pricing", "https://help.acme.com/troubleshooting"],
  },
  {
    icon: HelpCircle,
    title: "Curated Objection Playbooks",
    size: "42 Q&A pairs",
    status: "Verified by Sales Lead",
    items: ["Handling 'Your price is higher than Competitor X'", "Explaining SOC2 Type II compliance", "Contract flexibility & pilot periods"],
  },
  {
    icon: ShieldAlert,
    title: "Guardrails & Forbidden Topics",
    size: "Active enforcement",
    status: "Zero hallucination mode",
    items: ["Never quote custom enterprise discounts over phone without approval", "Strictly refuse investment or financial advice", "Immediate warm transfer if caller expresses legal dispute"],
  },
];

export function TrainingSection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="train" className="py-24 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="TRAIN YOUR WORKFORCE"
          title="Instant Knowledge Ingestion with"
          highlight="Zero Hallucinations"
          subtitle="Equip your AI voice employees with your company's deepest documentation, FAQs, and objection playbooks in minutes."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Knowledge Cards */}
          <div className="lg:col-span-6 space-y-4">
            {KNOWLEDGE_SOURCES.map((source, idx) => {
              const Icon = source.icon;
              const isSelected = activeCard === idx;
              return (
                <div
                  key={source.title}
                  onClick={() => setActiveCard(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white border-[#7657E8] shadow-lg shadow-[#7657E8]/10 -translate-y-0.5'
                      : 'bg-white/60 hover:bg-white border-[#7657E8]/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#7657E8] text-white' : 'bg-[#EDE7FF] text-[#7657E8]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#171522]">{source.title}</h3>
                        <p className="text-xs text-[#6F6B7D]">{source.size}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#20B486]/10 text-[#20B486] flex items-center gap-1">
                      <Check className="w-3 h-3" /> {source.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Knowledge Engine Inspector */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#7657E8]/15 shadow-xl shadow-[#7657E8]/5 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#7657E8]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EDE7FF] flex items-center justify-center text-[#7657E8]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171522]">
                      Vector Retrieval & Hallucination Guard
                    </h4>
                    <p className="text-xs text-[#6F6B7D]">Grounding Accuracy: 99.8%</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#7657E8]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Real-time
                </div>
              </div>

              {/* Indexed Contents Preview */}
              <div>
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block mb-3">
                  Indexed Knowledge Items in {KNOWLEDGE_SOURCES[activeCard].title}
                </span>
                <div className="space-y-2">
                  {KNOWLEDGE_SOURCES[activeCard].items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/10 text-xs font-medium text-[#171522]"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7657E8]" />
                        <span className="truncate">{item}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#20B486] bg-[#20B486]/10 px-2 py-0.5 rounded-md shrink-0">
                        Retrievable &lt;80ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Dropzone Simulator */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#7657E8]/25 bg-[#FAF9FD]/80 text-center hover:bg-[#EDE7FF]/20 transition-colors">
                <UploadCloud className="w-8 h-8 text-[#7657E8] mx-auto mb-2" />
                <div className="text-xs font-bold text-[#171522]">
                  Drop documents, URLs, or audio recordings here
                </div>
                <div className="text-[11px] text-[#6F6B7D] mt-1">
                  Supports PDF, DOCX, CSV, audio transcripts, or Zendesk/Notion exports
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
