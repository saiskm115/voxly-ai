import React, { useState } from 'react';
import {
  PhoneIncoming,
  PhoneOutgoing,
  ListPlus,
  PhoneCall,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import { PHONE_CHANNELS } from '../data/siteContent';

const TAB_ICONS = {
  inbound: PhoneIncoming,
  outbound: PhoneOutgoing,
  campaigns: ListPlus,
};

export function PhoneChannelsSection({ onGetStarted }) {
  const [activeTab, setActiveTab] = useState('inbound');

  const selectedChannel = PHONE_CHANNELS.find((c) => c.id === activeTab) || PHONE_CHANNELS[0];
  const TabIcon = TAB_ICONS[selectedChannel.id] || PhoneCall;

  return (
    <section id="phone" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#7657E8]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Telephony Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Put your AI <span className="gradient-text-lavender">on the phone.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            From single inbound numbers to automated outbound outreach and multi-thousand contact campaigns, give your AI a voice on the global telephone network.
          </p>
        </div>

        {/* Visual Architecture Hierarchy Diagram */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block bg-white p-6 sm:p-8 rounded-3xl border border-[#7657E8]/20 shadow-md">
            {/* Top Node */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7657E8] text-white text-xs font-extrabold tracking-wider uppercase shadow-md shadow-[#7657E8]/25 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>AI EMPLOYEE</span>
            </div>

            {/* Tree branches */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-6 bg-[#7657E8]/30" />
            </div>

            {/* Middle branches */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto">
              <div className="flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-[#EDE7FF] text-[#7657E8] font-bold text-xs">
                  INBOUND
                </div>
                <div className="w-0.5 h-4 bg-[#7657E8]/20 my-1" />
                <span className="text-[11px] font-semibold text-[#6F6B7D]">Customers</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-[#EDE7FF] text-[#7657E8] font-bold text-xs">
                  OUTBOUND
                </div>
                <div className="w-0.5 h-4 bg-[#7657E8]/20 my-1" />
                <span className="text-[11px] font-semibold text-[#6F6B7D]">Leads</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-[#EDE7FF] text-[#7657E8] font-bold text-xs">
                  CAMPAIGNS
                </div>
                <div className="w-0.5 h-4 bg-[#7657E8]/20 my-1" />
                <span className="text-[11px] font-semibold text-[#6F6B7D]">Bulk Calls</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Interactive Channel Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#7657E8]/20 shadow-sm gap-2">
            {PHONE_CHANNELS.map((ch) => {
              const Icon = TAB_ICONS[ch.id] || PhoneCall;
              const isSelected = activeTab === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveTab(ch.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-white shadow-md shadow-[#7657E8]/25'
                      : 'text-[#6F6B7D] hover:text-[#171522] hover:bg-[#FAF9FD]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Channel Display Showcase */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#7657E8]/20 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Description & Features */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7FF] text-[#7657E8] text-xs font-bold mb-4">
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{selectedChannel.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171522] mb-4">
                  {selectedChannel.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#6F6B7D] leading-relaxed mb-8">
                  {selectedChannel.desc}
                </p>

                {/* Bullet checklist */}
                <div className="space-y-3 mb-8">
                  {selectedChannel.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#171522]">
                      <div className="w-5 h-5 rounded-full bg-[#EDE7FF] flex items-center justify-center text-[#7657E8] flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#7657E8]/10 flex items-center justify-between gap-4">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#7657E8] hover:bg-[#6A47E5] shadow-md shadow-[#7657E8]/25 transition-all"
                >
                  <span>Deploy {selectedChannel.title} Line</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#20B486] bg-[#20B486]/10 px-3 py-1 rounded-full">
                  ⚡ {selectedChannel.stat}
                </span>
              </div>
            </div>

            {/* Right Column: Live Phone Call Interface Mockup */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#171522] to-[#25203B] p-8 text-white flex flex-col justify-center relative">
              <div className="max-w-xs mx-auto w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 shadow-2xl">
                
                {/* Simulated Phone Screen */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7657E8] to-[#9B7BF7] mx-auto flex items-center justify-center text-2xl shadow-lg mb-3">
                    🤖
                  </div>
                  <h4 className="text-sm font-bold text-white">Voxly Voice Employee</h4>
                  <p className="text-xs text-[#20B486] font-medium flex items-center justify-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#20B486] animate-pulse" />
                    Call in Progress • 01:24
                  </p>
                </div>

                {/* Call metadata pills */}
                <div className="space-y-2 mb-6 text-xs">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] font-bold uppercase">Connected Caller:</span>
                    <span className="text-white font-semibold">{selectedChannel.mockCaller}</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 block text-[10px] font-bold uppercase">Target Goal:</span>
                    <span className="text-[#EDE7FF] font-semibold">{selectedChannel.mockGoal}</span>
                  </div>
                </div>

                {/* Mini audio bar */}
                <div className="flex items-center justify-center gap-1 h-8 px-4 rounded-xl bg-black/40 border border-white/5">
                  {[12, 24, 18, 28, 14, 22, 10, 26, 18, 12].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#7657E8] rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
