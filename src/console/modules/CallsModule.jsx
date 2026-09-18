import React, { useState } from 'react';
import {
  PhoneCall,
  Search,
  Filter,
  Play,
  Pause,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Volume2,
  Calendar,
  Share2,
  FileText
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { useWorkspace } from '../context/WorkspaceContext';

export function CallsModule() {
  const { calls, selectedCallId, setSelectedCallId, selectedCall, agents } = useWorkspace();
  const [filterDirection, setFilterDirection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(12);

  const filteredCalls = calls.filter((call) => {
    const matchesDir = filterDirection === 'All' || call.direction.toLowerCase() === filterDirection.toLowerCase();
    const matchesSearch =
      call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.callerPhone.includes(searchQuery) ||
      call.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.outcome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDir && matchesSearch;
  });

  const activeCall = calls.find((c) => c.id === selectedCallId) || (calls.length > 0 ? calls[0] : null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
            Call Logs & Transcripts ({calls.length})
          </h2>
          <p className="text-xs text-[#A19EAD] mt-0.5">
            Inspect real-time conversation audio, diarized speaker transcripts, and AI-extracted sentiment.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#181724] border border-[#262438]">
        <div className="flex items-center gap-1">
          {['All', 'Inbound', 'Outbound'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterDirection(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterDirection === tab
                  ? 'bg-[#6344E7] text-white shadow-xs'
                  : 'text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#111019]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-[#6E6B7B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by caller, agent, outcome..."
            className="w-full bg-[#111019] border border-[#262438] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#F7F7FB] placeholder-[#6E6B7B] focus:outline-none focus:border-[#6344E7]"
          />
        </div>
      </div>

      {/* Main Split View: Table on Left, Detail Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calls Table (7 cols on large screens) */}
        <div className={`${activeCall ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <SolidCard padding="p-0" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#262438] bg-[#111019] text-[10px] font-bold text-[#6E6B7B] uppercase tracking-wider">
                    <th className="py-3 px-4">Caller</th>
                    <th className="py-3 px-3">Agent</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3 font-mono">Duration</th>
                    <th className="py-3 px-3">Outcome</th>
                    <th className="py-3 px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262438]">
                  {filteredCalls.map((call) => {
                    const isSelected = activeCall && activeCall.id === call.id;
                    return (
                      <tr
                        key={call.id}
                        onClick={() => setSelectedCallId(call.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#6344E7]/10' : 'hover:bg-[#111019]/50'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#F7F7FB]">{call.callerName}</div>
                          <div className="text-[10px] font-mono text-[#6E6B7B]">{call.callerPhone}</div>
                        </td>
                        <td className="py-3.5 px-3 text-[#A19EAD] font-medium">{call.agentName}</td>
                        <td className="py-3.5 px-3">
                          <StatusBadge status={call.direction} size="xs" />
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-[#F7F7FB]">{call.formattedDuration}</td>
                        <td className="py-3.5 px-3">
                          <span className="text-[11px] text-[#A19EAD] truncate max-w-[150px] block">
                            {call.outcome}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right text-[11px] text-[#6E6B7B]">
                          {call.timestamp}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SolidCard>
        </div>

        {/* Call Detail Inspector Drawer (5 cols) */}
        {activeCall && (
          <div className="lg:col-span-5 space-y-4">
            <SolidCard className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-3 border-b border-[#262438]">
                <div>
                  <span className="text-[10px] font-mono text-[#6E6B7B] uppercase">
                    Call Record ID: {activeCall.id}
                  </span>
                  <h3 className="text-sm font-bold text-[#F7F7FB] mt-0.5">
                    {activeCall.callerName} ({activeCall.callerPhone})
                  </h3>
                </div>
                <StatusBadge status={activeCall.sentiment} size="xs" />
              </div>

              {/* Dual-Track Audio Waveform Player Simulation */}
              <div className="p-3.5 rounded-xl bg-[#111019] border border-[#262438] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#A19EAD]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#F7F7FB]">
                    <Volume2 className="w-3.5 h-3.5 text-[#6344E7]" />
                    <span>Call Recording Audio</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#6E6B7B]">
                    00:{playbackTime < 10 ? `0${playbackTime}` : playbackTime} / {activeCall.formattedDuration}
                  </span>
                </div>

                {/* Animated / Clickable Waveform Bars */}
                <div className="h-10 flex items-center gap-1 cursor-pointer py-1">
                  {[20, 45, 60, 80, 50, 30, 75, 90, 100, 65, 40, 25, 60, 85, 40, 20, 70, 95, 80, 55, 35, 65, 90, 45, 30, 55, 75, 60, 40, 25].map(
                    (barHeight, idx) => (
                      <div
                        key={idx}
                        onClick={() => setPlaybackTime(idx * 5)}
                        style={{ height: `${barHeight}%` }}
                        className={`flex-1 rounded-full transition-all ${
                          idx < 8 ? 'bg-[#6344E7]' : 'bg-[#262438] hover:bg-[#3D3A55]'
                        }`}
                      />
                    )
                  )}
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#6344E7] text-white text-xs font-semibold hover:bg-[#7557F8] active:scale-[0.98] transition-all"
                  >
                    {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isPlayingAudio ? 'Pause' : 'Play'}</span>
                  </button>

                  <span className="text-[10px] font-mono text-[#6E6B7B]">
                    Cost: {activeCall.cost} (Billed {activeCall.durationSeconds}s)
                  </span>
                </div>
              </div>

              {/* AI Structured Summary */}
              <div className="p-3.5 rounded-xl bg-[#111019] border border-[#262438] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F7F7FB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#6344E7]" />
                  <span>AI Executive Summary</span>
                </div>
                <p className="text-xs text-[#A19EAD] leading-relaxed">
                  {activeCall.summary}
                </p>

                {activeCall.extractedFields && (
                  <div className="pt-2 border-t border-[#262438] grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {Object.entries(activeCall.extractedFields).map(([k, v]) => (
                      <div key={k} className="bg-[#181724] p-2 rounded-lg border border-[#262438]">
                        <span className="text-[#6E6B7B] block text-[9px] uppercase tracking-wider">{k}</span>
                        <span className="text-[#F7F7FB] truncate block font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Diarized Transcript Bubbles */}
              <div>
                <h4 className="text-xs font-bold text-[#F7F7FB] mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#A19EAD]" />
                  <span>Diarized Transcript ({activeCall.transcript?.length || 0} turns)</span>
                </h4>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {(activeCall.transcript || []).map((t, idx) => {
                    const isAgent = t.speaker === activeCall.agentName;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-[#181724] border border-[#262438] ml-3'
                            : 'bg-[#111019] border border-[#262438] mr-3'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#6E6B7B] mb-1 font-mono">
                          <span className={`font-bold ${isAgent ? 'text-[#6344E7]' : 'text-[#3B82F6]'}`}>
                            {t.speaker}
                          </span>
                          <span>{t.time}</span>
                        </div>
                        <p className="text-[#F7F7FB]">{t.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SolidCard>
          </div>
        )}
      </div>
    </div>
  );
}
