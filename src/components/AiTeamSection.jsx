import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Headphones,
  Calendar,
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  Play,
  ArrowRight
} from 'lucide-react';
import { AI_TEAM_MEMBERS } from '../data/siteContent';
import { voiceAgent } from '../services/voiceAgent';

export function AiTeamSection({ onGetStarted }) {
  const [activeMemberId, setActiveMemberId] = useState(AI_TEAM_MEMBERS[0].id);
  const [playingId, setPlayingId] = useState(null);

  const activeAgent = AI_TEAM_MEMBERS.find((m) => m.id === activeMemberId) || AI_TEAM_MEMBERS[0];

  const handlePlayVoice = (agent) => {
    setPlayingId(agent.id);
    voiceAgent.playTTS(agent.sampleDialogue, () => {
      setPlayingId(null);
    });
  };

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Agent Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Build an AI team,{' '}
            <span className="gradient-text-lavender">not just one agent.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            Give every agent a different role, voice, knowledge set, and objective. Deploy specialized employees that collaborate across your entire customer lifecycle.
          </p>
        </div>

        {/* Visual Architecture Banner: YOUR AI TEAM */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#7657E8] block mb-4">
            YOUR AI WORKFORCE FLEET
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {AI_TEAM_MEMBERS.map((m) => {
              const isSelected = activeMemberId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMemberId(m.id)}
                  className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center ${
                    isSelected
                      ? 'bg-white border-[#7657E8] shadow-md shadow-[#7657E8]/15 scale-105'
                      : 'bg-white/60 hover:bg-white border-[#7657E8]/15'
                  }`}
                >
                  <span className="text-2xl mb-1">{m.avatar}</span>
                  <span className="text-xs font-extrabold text-[#171522]">{m.role}</span>
                  <span className="text-[10px] text-[#7657E8] font-bold">{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Specialized Employee Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AI_TEAM_MEMBERS.map((member) => {
            const isSelected = activeMemberId === member.id;
            const isSpeaking = playingId === member.id;

            return (
              <div
                key={member.id}
                onClick={() => setActiveMemberId(member.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#7657E8] shadow-xl shadow-[#7657E8]/12 -translate-y-1'
                    : 'bg-white/75 hover:bg-white border-[#7657E8]/15 hover:border-[#7657E8]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{member.avatar}</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EDE7FF] text-[#7657E8]">
                      {member.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171522] mb-0.5">
                    {member.name}
                  </h3>
                  <h4 className="text-xs font-bold text-[#7657E8] mb-3">
                    {member.role}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed mb-4">
                    {member.desc}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {member.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-[#171522]/5 text-[#171522]/80 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Voice button */}
                <div className="pt-4 border-t border-[#171522]/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVoice(member);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      isSpeaking
                        ? 'bg-[#20B486] text-white animate-pulse'
                        : 'bg-[#EDE7FF] hover:bg-[#7657E8] text-[#7657E8] hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Playing Voice...' : `Sample ${member.voice.split(' ')[0]}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Employee Deep-Dive Spotlight Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#7657E8]/20 shadow-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#7657E8]/10">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl">{activeAgent.avatar}</span>
              <div>
                <h4 className="text-lg font-extrabold text-[#171522] flex items-center gap-2">
                  {activeAgent.name} • {activeAgent.title}
                </h4>
                <p className="text-xs text-[#6F6B7D]">Neural Voice: {activeAgent.voice}</p>
              </div>
            </div>
            <button
              onClick={() => handlePlayVoice(activeAgent)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#7657E8] text-white hover:bg-[#6A47E5] shadow-sm transition-all"
            >
              <Play className="w-3 h-3 fill-current ml-0.5" />
              <span>Listen to Persona</span>
            </button>
          </div>

          <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/10 text-xs sm:text-sm text-[#171522] mb-6">
            <span className="text-[10px] font-bold text-[#7657E8] uppercase tracking-wider block mb-1">
              Sample Live Phone Greeting:
            </span>
            <p className="font-mono text-[#171522] leading-relaxed">
              "{activeAgent.sampleDialogue}"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-[#6F6B7D]">Ready to deploy as an autonomous phone agent</span>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 text-[#7657E8] font-bold hover:underline"
            >
              <span>Deploy {activeAgent.role} to your number</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
