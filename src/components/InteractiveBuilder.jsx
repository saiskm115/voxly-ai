import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { EMPLOYEE_PRESETS } from '../data/siteContent';
import { voiceAgent } from '../services/voiceAgent';
import { Bot, Sliders, Volume2, Sparkles, CheckCircle2, Phone, Zap, Play, Square } from 'lucide-react';

export function InteractiveBuilder({ onSelectBotState }) {
  const [selectedPreset, setSelectedPreset] = useState(EMPLOYEE_PRESETS[0]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeTab, setActiveTab] = useState('prompt');

  const handleTestVoice = (text) => {
    if (isPlayingVoice) {
      voiceAgent.stopTTS();
      setIsPlayingVoice(false);
      if (onSelectBotState) onSelectBotState('IDLE');
    } else {
      setIsPlayingVoice(true);
      if (onSelectBotState) onSelectBotState('TALKING');
      voiceAgent.playTTS(text, {
        onEnd: () => {
          setIsPlayingVoice(false);
          if (onSelectBotState) onSelectBotState('IDLE');
        },
      });
    }
  };

  return (
    <section id="builder" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="CREATE YOUR AI EMPLOYEE"
          title="Build AI Employees For"
          highlight="Real Work"
          subtitle="Configure autonomous voice reps that make and receive calls, follow conversational playbooks, handle objections, and sync with your stack."
        />

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {EMPLOYEE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                if (isPlayingVoice) {
                  voiceAgent.stopTTS();
                  setIsPlayingVoice(false);
                }
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                selectedPreset.id === preset.id
                  ? 'bg-[#7657E8] text-white shadow-md shadow-[#7657E8]/25 scale-102'
                  : 'bg-[#FAF9FD] text-[#6F6B7D] hover:bg-[#EDE7FF]/60 hover:text-[#171522] border border-[#7657E8]/10'
              }`}
            >
              <span className="text-xl">{preset.avatar}</span>
              <div className="text-left">
                <div className="leading-tight">{preset.name}</div>
                <div className={`text-[11px] font-medium ${selectedPreset.id === preset.id ? 'text-[#EDE7FF]' : 'text-[#6F6B7D]'}`}>
                  {preset.role}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Product Studio Mockup Container */}
        <div className="bg-[#FAF9FD] rounded-3xl border border-[#7657E8]/15 shadow-xl shadow-[#7657E8]/5 overflow-hidden">
          {/* Mockup Studio Top Navigation Header */}
          <div className="px-6 py-4 bg-white/90 border-b border-[#7657E8]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#E85D75]/70" />
                <div className="w-3 h-3 rounded-full bg-[#E5A62B]/70" />
                <div className="w-3 h-3 rounded-full bg-[#20B486]/70" />
              </div>
              <span className="text-xs font-bold text-[#6F6B7D] tracking-wide ml-2">
                voxly.app / employees / {selectedPreset.id}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20B486]/10 text-[#20B486] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#20B486] animate-pulse" />
                Live on SIP Trunk
              </span>
              <button
                onClick={() => handleTestVoice(`Hi there! I am ${selectedPreset.name}, your ${selectedPreset.role}. I am ready to handle your incoming calls with human empathy.`)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isPlayingVoice
                    ? 'bg-[#E85D75] text-white shadow-xs'
                    : 'bg-[#7657E8] hover:bg-[#6845DF] text-white shadow-xs'
                }`}
              >
                {isPlayingVoice ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlayingVoice ? 'Stop Audition' : 'Audition Voice'}</span>
              </button>
            </div>
          </div>

          {/* Builder Main Grid */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Configuration Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Persona Overview Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#EDE7FF] flex items-center justify-center text-3xl shadow-inner">
                      {selectedPreset.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#171522]">
                        {selectedPreset.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#7657E8]">
                        {selectedPreset.role}
                      </p>
                      <p className="text-xs text-[#6F6B7D] mt-0.5">
                        Tone: {selectedPreset.temperament}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block">
                      Target Latency
                    </span>
                    <span className="text-sm font-extrabold text-[#20B486]">
                      {selectedPreset.latency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Voice & Acoustic Engine */}
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs">
                <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#7657E8]" /> Voice & Acoustic Model
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/10">
                    <span className="text-[11px] text-[#6F6B7D] block">Selected Model</span>
                    <span className="text-sm font-bold text-[#171522]">{selectedPreset.voice}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/10">
                    <span className="text-[11px] text-[#6F6B7D] block">Accent & Cadence</span>
                    <span className="text-sm font-bold text-[#171522]">{selectedPreset.accent}</span>
                  </div>
                </div>
              </div>

              {/* Instructions & System Prompt Editor */}
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#7657E8]" /> Conversational Playbook & Prompt
                  </h4>
                  <span className="text-[11px] text-[#7657E8] font-bold">Autosaved</span>
                </div>
                <div className="bg-[#FAF9FD] p-3.5 rounded-xl border border-[#7657E8]/10 font-mono text-xs text-[#171522] leading-relaxed">
                  {selectedPreset.systemPrompt}
                </div>
              </div>

            </div>

            {/* Right Column: Goal & Live Qualification Criteria */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Call Objective */}
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs">
                <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#E5A62B]" /> Primary Objective
                </h4>
                <p className="text-sm text-[#171522] font-semibold bg-[#EDE7FF]/40 p-3 rounded-xl border border-[#7657E8]/10">
                  {selectedPreset.primaryGoal}
                </p>
              </div>

              {/* Qualification Rules */}
              <div className="bg-white p-5 rounded-2xl border border-[#7657E8]/10 shadow-xs">
                <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider mb-3">
                  Qualification Logic
                </h4>
                <ul className="space-y-2.5 text-xs text-[#171522]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#20B486] shrink-0" />
                    <span>Detect company size & logistics dispatch scale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#20B486] shrink-0" />
                    <span>Verify decision-making budget authority &gt;$20,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#20B486] shrink-0" />
                    <span>Cross-reference calendar availability and book demo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#20B486] shrink-0" />
                    <span>Dispatch webhook payload to Salesforce & Slack alert</span>
                  </li>
                </ul>
              </div>

              {/* Performance Telemetry */}
              <div className="bg-gradient-to-br from-[#7657E8] to-[#9B7BF7] p-5 rounded-2xl text-white shadow-md shadow-[#7657E8]/20">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#EDE7FF]">
                  Fleet Performance
                </span>
                <div className="grid grid-cols-3 gap-3 mt-3 text-center">
                  {Object.entries(selectedPreset.metrics).map(([key, val]) => (
                    <div key={key} className="bg-white/15 backdrop-blur-xs p-2.5 rounded-xl">
                      <div className="text-base sm:text-lg font-extrabold">{val}</div>
                      <div className="text-[10px] text-[#EDE7FF] capitalize mt-0.5">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                    </div>
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
