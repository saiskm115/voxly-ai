import React, { useState } from 'react';
import {
  Bot,
  Plus,
  Play,
  FileCode2,
  Phone,
  Copy,
  Pause,
  Trash2,
  Search,
  Filter,
  Volume2,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { useWorkspace } from '../context/WorkspaceContext';

export function EmployeesModule({
  onNavigate,
  onOpenCreateAgent,
  onOpenBuyNumber
}) {
  const {
    agents,
    setSelectedAgentId,
    duplicateAgent,
    toggleAgentStatus,
    deleteAgent,
    setBuyNumberPreselectedAgent
  } = useWorkspace();

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Active' && agent.status === 'active') ||
      (filter === 'Paused' && agent.status === 'paused') ||
      (filter === 'Draft' && agent.status === 'draft');

    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase()) ||
      agent.department.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Fast Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
            AI Employees Fleet ({agents.length})
          </h2>
          <p className="text-xs text-[#A19EAD] mt-0.5">
            Configure autonomous voice agents, customize scripts, and assign dedicated virtual numbers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <TactileButton
            onClick={onOpenCreateAgent}
            variant="primary"
            icon={Plus}
            size="md"
          >
            Create AI Employee
          </TactileButton>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#181724] border border-[#262438]">
        {/* Status Pills */}
        <div className="flex items-center gap-1">
          {['All', 'Active', 'Paused', 'Draft'].map((tab) => {
            const count =
              tab === 'All'
                ? agents.length
                : agents.filter((a) => a.status.toLowerCase() === tab.toLowerCase()).length;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === tab
                    ? 'bg-[#6344E7] text-white shadow-xs'
                    : 'text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#111019]'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-[#6E6B7B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, department..."
            className="w-full bg-[#111019] border border-[#262438] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#F7F7FB] placeholder-[#6E6B7B] focus:outline-none focus:border-[#6344E7]"
          />
        </div>
      </div>

      {/* Grid of Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAgents.map((agent) => (
          <SolidCard key={agent.id} className="flex flex-col justify-between group">
            {/* Header: Avatar, Name, Status, Role */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#111019] border border-[#262438] flex items-center justify-center text-[#6344E7] font-bold text-lg shadow-sm">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#F7F7FB]">
                        {agent.name}
                      </h3>
                      <StatusBadge status={agent.status} size="xs" />
                    </div>
                    <div className="text-xs text-[#A19EAD] font-medium mt-0.5">
                      {agent.role} • <span className="text-[#6E6B7B]">{agent.department}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Toggle Status */}
                <button
                  type="button"
                  onClick={() => toggleAgentStatus(agent.id)}
                  title={agent.status === 'active' ? 'Pause Agent' : 'Activate Agent'}
                  className="p-1.5 rounded-lg text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#111019] border border-transparent hover:border-[#262438] transition-all"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-[#A19EAD] line-clamp-2 mb-4 leading-relaxed">
                {agent.description}
              </p>

              {/* Specs Ribbon: Phone Number & Voice */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#111019] border border-[#262438] mb-4 text-xs">
                {/* Number */}
                <div>
                  <span className="text-[10px] text-[#6E6B7B] uppercase tracking-wider block font-bold">
                    Phone Assigned
                  </span>
                  {agent.assignedNumber ? (
                    <span className="font-mono font-semibold text-[#F7F7FB] mt-0.5 block truncate">
                      {agent.assignedNumber}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setBuyNumberPreselectedAgent(agent.id);
                        onOpenBuyNumber();
                      }}
                      className="text-xs font-semibold text-[#6344E7] hover:underline mt-0.5 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Assign Number</span>
                    </button>
                  )}
                </div>

                {/* Voice */}
                <div>
                  <span className="text-[10px] text-[#6E6B7B] uppercase tracking-wider block font-bold">
                    Voice Engine
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-[#F7F7FB] mt-0.5 truncate">
                    <Volume2 className="w-3 h-3 text-[#6344E7] shrink-0" />
                    <span className="truncate">{agent.voice.provider} — {agent.voice.voiceName.split('—')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-[#262438] text-[11px] font-mono mb-4 text-center">
                <div>
                  <span className="text-[#6E6B7B] block text-[10px]">Calls Handled</span>
                  <span className="font-bold text-[#F7F7FB]">{agent.stats.totalCalls.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#6E6B7B] block text-[10px]">Task Success</span>
                  <span className="font-bold text-[#22C55E]">{agent.stats.successRate}%</span>
                </div>
                <div>
                  <span className="text-[#6E6B7B] block text-[10px]">Avg Duration</span>
                  <span className="font-bold text-[#F7F7FB]">{agent.stats.avgDuration}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#262438]">
              <div className="flex items-center gap-1.5">
                <TactileButton
                  size="sm"
                  variant="primary"
                  icon={Play}
                  onClick={() => {
                    setSelectedAgentId(agent.id);
                    onNavigate('talk-to-ai');
                  }}
                >
                  Test Voice
                </TactileButton>

                <TactileButton
                  size="sm"
                  variant="secondary"
                  icon={FileCode2}
                  onClick={() => {
                    setSelectedAgentId(agent.id);
                    onNavigate('agent-studio');
                  }}
                >
                  Script & Flow
                </TactileButton>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => duplicateAgent(agent.id)}
                  title="Duplicate Agent"
                  className="p-2 rounded-xl text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#111019] border border-transparent hover:border-[#262438] transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
                      deleteAgent(agent.id);
                    }
                  }}
                  title="Delete Agent"
                  className="p-2 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/15 border border-transparent hover:border-[#EF4444]/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </SolidCard>
        ))}
      </div>
    </div>
  );
}
