import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  Bot,
  Filter,
  Volume2,
  FileText,
  Search,
  ArrowRight
} from 'lucide-react';
import { CONVERSATIONS_DATA } from '../data/siteContent';

export function ConversationHistorySection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeCallId, setActiveCallId] = useState('#2841');

  const filteredCalls = CONVERSATIONS_DATA.recentCalls.filter((c) => {
    if (selectedFilter === 'All') return true;
    return c.sentiment === selectedFilter;
  });

  return (
    <section id="conversations" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Call Records & Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Every conversation, <span className="gradient-text-lavender">in one place.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            {CONVERSATIONS_DATA.subheadline} Full audio recordings, synchronized transcripts, detected intent, and verified business outcomes.
          </p>
        </div>

        {/* Filters Bar: All, Positive, Neutral, Negative */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter Sentiment:
            </span>
            {CONVERSATIONS_DATA.filters.map((flt) => {
              const isSelected = selectedFilter === flt;
              return (
                <button
                  key={flt}
                  onClick={() => setSelectedFilter(flt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#7657E8] text-white shadow-sm'
                      : 'bg-[#FAF9FD] text-[#6F6B7D] hover:text-[#171522] border border-[#7657E8]/15'
                  }`}
                >
                  {flt}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#6F6B7D] font-semibold">
            Showing {filteredCalls.length} of {CONVERSATIONS_DATA.recentCalls.length} Recorded Calls
          </div>
        </div>

        {/* 2-Column Dashboard View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Call History List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/15 space-y-2.5">
              <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-2">
                Recent Call Logs (Auto-Logged)
              </span>

              {filteredCalls.map((call) => {
                const isActive = activeCallId === call.id;
                return (
                  <div
                    key={call.id}
                    onClick={() => setActiveCallId(call.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isActive
                        ? 'bg-white border-[#7657E8] shadow-md shadow-[#7657E8]/10'
                        : 'bg-white/60 hover:bg-white border-[#7657E8]/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-[#7657E8]">{call.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        call.sentiment === 'Positive'
                          ? 'bg-[#20B486]/10 text-[#20B486]'
                          : call.sentiment === 'Neutral'
                          ? 'bg-[#7657E8]/10 text-[#7657E8]'
                          : 'bg-[#FF3366]/10 text-[#FF3366]'
                      }`}>
                        {call.sentiment}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#171522]">{call.caller}</h4>
                    <p className="text-xs text-[#6F6B7D]">{call.company}</p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#171522]/5 text-[11px]">
                      <span className="text-[#6F6B7D] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {call.duration}
                      </span>
                      <span className="font-semibold text-[#171522]">{call.outcome}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Full Call Detail & Transcript with Verified Checklist */}
          <div className="lg:col-span-7">
            <div className="bg-[#171522] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              {/* Call Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#7657E8] text-white">
                      {CONVERSATIONS_DATA.callNumber}
                    </span>
                    <span className="text-xs text-white/60">Duration: {CONVERSATIONS_DATA.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{CONVERSATIONS_DATA.caller}</h4>
                  <p className="text-xs text-white/50">Handling Agent: {CONVERSATIONS_DATA.agent}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#20B486]/20 text-[#20B486] border border-[#20B486]/30">
                  ● Sentiment: {CONVERSATIONS_DATA.sentiment}
                </span>
              </div>

              {/* Transcript Chat Bubbles */}
              <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                {CONVERSATIONS_DATA.transcript.map((msg, i) => {
                  const isCustomer = msg.speaker === 'Customer';
                  return (
                    <div
                      key={i}
                      className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                        isCustomer ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl ${
                          isCustomer
                            ? 'bg-white/10 text-white/90 rounded-tl-sm'
                            : 'bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white rounded-tr-sm shadow-md'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-white/50 block mb-1">
                          {msg.speaker}
                        </span>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Outcome Checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2">
                  System Automated Actions & Dispositions:
                </span>
                {CONVERSATIONS_DATA.outcomes.map((out, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#20B486] flex-shrink-0" />
                    <span className="font-bold text-[#EDE7FF]">{out.label}:</span>
                    <span className="text-white/70">{out.status}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
