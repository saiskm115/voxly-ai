import React, { useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';
import { CALL_SIMULATOR_SCENARIOS } from '../data/siteContent';
import { voiceAgent } from '../services/voiceAgent';
import { Phone, PhoneCall, Play, Pause, RotateCcw, Sparkles, CheckCircle2, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';

export function InteractiveCallSimulator({ onSelectBotState }) {
  const [selectedScenario, setSelectedScenario] = useState(CALL_SIMULATOR_SCENARIOS[0]);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      const currentMsg = selectedScenario.conversation[activeMessageIndex];
      
      // If Voxly is speaking, trigger TALKING on bot
      if (currentMsg.speaker === 'Voxly') {
        if (onSelectBotState) onSelectBotState('TALKING');
      } else {
        if (onSelectBotState) onSelectBotState('LISTENING');
      }

      timer = setTimeout(() => {
        if (activeMessageIndex < selectedScenario.conversation.length - 1) {
          setActiveMessageIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          if (onSelectBotState) onSelectBotState('IDLE');
        }
      }, 3600);
    } else {
      if (onSelectBotState) onSelectBotState('IDLE');
    }

    return () => clearTimeout(timer);
  }, [isPlaying, activeMessageIndex, selectedScenario, onSelectBotState]);

  const togglePlay = () => {
    if (!isPlaying && activeMessageIndex >= selectedScenario.conversation.length - 1) {
      setActiveMessageIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveMessageIndex(0);
    if (onSelectBotState) onSelectBotState('IDLE');
  };

  return (
    <section id="simulator" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="CALL & CONVERSATION INTELLIGENCE"
          title="Autonomous Calls with Instant"
          highlight="Deal Qualification"
          subtitle="Experience real-time AI phone conversations, sub-second objection handling, sentiment scoring, and automated CRM record generation."
        />

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CALL_SIMULATOR_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc);
                handleReset();
              }}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedScenario.id === sc.id
                  ? 'bg-[#7657E8] text-white shadow-md shadow-[#7657E8]/25'
                  : 'bg-[#FAF9FD] text-[#6F6B7D] hover:bg-[#EDE7FF]/60 border border-[#7657E8]/10'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{sc.title}</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white/20">
                {sc.type}
              </span>
            </button>
          ))}
        </div>

        {/* Main Simulator Card */}
        <div className="bg-[#FAF9FD] rounded-3xl border border-[#7657E8]/15 shadow-xl shadow-[#7657E8]/5 overflow-hidden">
          
          {/* Active Call Status Bar */}
          <div className="px-6 py-4 bg-white/90 border-b border-[#7657E8]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EDE7FF] flex items-center justify-center text-[#7657E8]">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#171522]">
                  {selectedScenario.caller}
                </div>
                <div className="text-xs text-[#6F6B7D] flex items-center gap-2">
                  <span>{selectedScenario.phone}</span>
                  <span>•</span>
                  <span className="text-[#20B486] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#20B486] animate-ping" />
                    HD Audio Codec (Opus 48kHz)
                  </span>
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-sm shadow-[#7657E8]/25 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Start Simulation'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-full bg-white hover:bg-[#EDE7FF]/50 text-[#6F6B7D] border border-[#7657E8]/10"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Live Transcript Stream */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider">
                  Live Streaming Transcript
                </span>
                <span className="text-xs font-bold text-[#7657E8] bg-[#EDE7FF] px-2.5 py-0.5 rounded-full">
                  Step {activeMessageIndex + 1} of {selectedScenario.conversation.length}
                </span>
              </div>

              {/* Message Timeline */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                {selectedScenario.conversation.slice(0, activeMessageIndex + 1).map((msg, idx) => {
                  const isVoxly = msg.speaker === 'Voxly';
                  const isCurrent = idx === activeMessageIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        isVoxly
                          ? 'bg-white border-l-4 border-l-[#7657E8] border border-[#7657E8]/10 shadow-xs'
                          : 'bg-[#EDE7FF]/30 border-l-4 border-l-[#5D6FEF] border border-[#5D6FEF]/10'
                      } ${isCurrent ? 'ring-2 ring-[#7657E8]/30 scale-[1.01]' : 'opacity-90'}`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${isVoxly ? 'text-[#7657E8]' : 'text-[#5D6FEF]'}`}>
                          {isVoxly ? <Sparkles className="w-3.5 h-3.5" /> : null}
                          {msg.speaker}
                        </span>
                        <span className="text-[10px] text-[#6F6B7D] font-mono">{msg.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#171522] leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Real-time Conversation Intelligence */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7657E8]" /> Real-Time Deal Intelligence
                </h4>

                {/* Lead Score Gauge */}
                <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#6F6B7D] block">Lead Qualification Score</span>
                    <span className="text-2xl font-extrabold text-[#7657E8]">
                      {selectedScenario.intelligence.leadScore} / 100
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#20B486] bg-[#20B486]/10 px-3 py-1 rounded-full">
                    High Intent
                  </span>
                </div>

                {/* Sentiment & Status */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#7657E8]/10">
                    <span className="text-[#6F6B7D]">Sentiment:</span>
                    <span className="font-bold text-[#20B486]">{selectedScenario.intelligence.sentiment}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#7657E8]/10">
                    <span className="text-[#6F6B7D]">Tier / Qualification:</span>
                    <span className="font-bold text-[#171522]">{selectedScenario.intelligence.qualification}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#7657E8]/10">
                    <span className="text-[#6F6B7D]">Estimated Annual Budget:</span>
                    <span className="font-bold text-[#7657E8]">{selectedScenario.intelligence.budgetEst}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#6F6B7D]">Automated Next Action:</span>
                    <span className="font-bold text-[#171522] text-right">{selectedScenario.intelligence.nextAction}</span>
                  </div>
                </div>

                {/* CRM Integration Pills */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#6F6B7D] border-t border-[#7657E8]/10">
                  <span className="flex items-center gap-1.5 text-[#20B486] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Synced to CRM
                  </span>
                  <span className="text-xs font-bold text-[#7657E8]">Salesforce • HubSpot</span>
                </div>
              </div>

              {/* DNC & Compliance Badge */}
              <div className="p-4 rounded-2xl bg-[#EDE7FF]/40 border border-[#7657E8]/10 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#7657E8] shrink-0" />
                <div className="text-xs text-[#171522]">
                  <span className="font-bold block">100% TCPA & DNC Compliant</span>
                  <span>Scrubbed against federal registries prior to dial-out.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
