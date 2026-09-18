import React, { useState } from 'react';
import {
  PhoneCall,
  Clock,
  Users,
  Bot,
  Play,
  FileCode2,
  Phone,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { useWorkspace } from '../context/WorkspaceContext';

export function OverviewModule({ onNavigate, onOpenCreateAgent, onOpenBuyNumber }) {
  const { agents, calls, leads, setSelectedAgentId, setSelectedCallId } = useWorkspace();
  const [activityTimeframe, setActivityTimeframe] = useState('Today');

  // Realistic hourly activity distribution
  const hourlyData = [
    { hour: '08:00', inbound: 12, outbound: 45 },
    { hour: '09:00', inbound: 28, outbound: 85 },
    { hour: '10:00', inbound: 42, outbound: 110 },
    { hour: '11:00', inbound: 55, outbound: 95 },
    { hour: '12:00', inbound: 38, outbound: 60 },
    { hour: '13:00', inbound: 45, outbound: 80 },
    { hour: '14:00', inbound: 62, outbound: 125 },
    { hour: '15:00', inbound: 58, outbound: 105 },
    { hour: '16:00', inbound: 41, outbound: 70 },
    { hour: '17:00', inbound: 24, outbound: 35 }
  ];

  const maxCalls = 187;

  return (
    <div className="space-y-6">
      {/* Welcome & Primary Actions Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E4E2EB] shadow-craft-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-mono text-[#047857] font-semibold uppercase tracking-wider">
              Autonomous Fleet Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F0E17] tracking-tight">
            Good afternoon, Admin
          </h2>
          <p className="text-xs text-[#524E5E] mt-1 max-w-xl leading-relaxed">
            Your {agents.length} AI voice employees handled 3,842 telephony conversations this week with an average task resolution rate of 92.4%.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <TactileButton
            onClick={onOpenBuyNumber}
            variant="secondary"
            icon={Phone}
            size="sm"
          >
            Buy Number
          </TactileButton>
          <TactileButton
            onClick={onOpenCreateAgent}
            variant="primary"
            icon={Bot}
            size="sm"
          >
            Create Agent
          </TactileButton>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Calls"
          value="3,842"
          trend="+14.2%"
          trendLabel="vs last week"
          icon={PhoneCall}
        />
        <MetricCard
          title="Talk Time Minutes"
          value="14,290"
          trend="+8.6%"
          trendLabel="per-second metered"
          icon={Clock}
        />
        <MetricCard
          title="Qualified Leads"
          value="849"
          trend="+21.4%"
          trendLabel="BANT qualified by AI"
          icon={Users}
        />
        <MetricCard
          title="Active AI Workforce"
          value={`${agents.filter((a) => a.status === 'active').length} Agents`}
          trend={`${agents.length} Total`}
          trendLabel="fleet ready"
          icon={Bot}
        />
      </div>

      {/* Call Activity Chart & Active Workforce Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Hourly Call Volume Canvas */}
        <SolidCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#0F0E17]">Call Activity Distribution</h3>
              <p className="text-xs text-[#524E5E]">Inbound reception vs. Outbound campaign calls</p>
            </div>

            {/* Segmented Timeframe Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-[#F0EEF6] border border-[#E4E2EB]">
              {['Today', '7 Days', '30 Days'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActivityTimeframe(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activityTimeframe === t
                      ? 'bg-white text-[#0F0E17] shadow-xs'
                      : 'text-[#524E5E] hover:text-[#0F0E17]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6">
            {hourlyData.map((d) => {
              const inboundPct = (d.inbound / maxCalls) * 100;
              const outboundPct = (d.outbound / maxCalls) * 100;

              return (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative">
                  <div className="w-full flex flex-col items-center gap-0.5 justify-end h-full">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-white bg-[#0F0E17] px-2 py-1 rounded-lg border border-[#0F0E17] absolute -translate-y-12 pointer-events-none whitespace-nowrap z-20 shadow-craft-sm">
                      {d.hour}: {d.inbound} in / {d.outbound} out
                    </div>

                    {/* Outbound bar */}
                    <div
                      style={{ height: `${outboundPct}%` }}
                      className="w-full max-w-[18px] bg-[#6344E7] rounded-t-sm transition-all group-hover:bg-[#5034CE]"
                    />
                    {/* Inbound bar */}
                    <div
                      style={{ height: `${inboundPct}%` }}
                      className="w-full max-w-[18px] bg-[#0F0E17] rounded-b-sm transition-all group-hover:bg-[#232130]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#524E5E]">{d.hour}</span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[#E4E2EB] text-xs text-[#524E5E]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#0F0E17]" />
              <span>Inbound Reception ({hourlyData.reduce((a, b) => a + b.inbound, 0)} calls)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#6344E7]" />
              <span>Outbound Campaigns ({hourlyData.reduce((a, b) => a + b.outbound, 0)} calls)</span>
            </div>
          </div>
        </SolidCard>

        {/* Right Col: Active AI Fleet Quick Strip */}
        <SolidCard className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0F0E17]">Active Fleet</h3>
            <button
              onClick={() => onNavigate('employees')}
              className="text-xs text-[#6344E7] hover:text-[#5034CE] font-semibold flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {agents.slice(0, 3).map((agent) => (
              <div
                key={agent.id}
                className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] hover:border-[#D1CFDB] transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#F0EEF6] border border-[#E4E2EB] flex items-center justify-center text-[#0F0E17] font-bold text-xs">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F0E17]">{agent.name}</div>
                      <div className="text-[10px] text-[#524E5E]">{agent.role}</div>
                    </div>
                  </div>
                  <StatusBadge status={agent.status} size="xs" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#524E5E] pt-2 border-t border-[#E4E2EB]">
                  <span>{agent.assignedNumber || 'No number'}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        onNavigate('talk-to-ai');
                      }}
                      className="text-[#6344E7] hover:text-[#5034CE] font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>Test</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        onNavigate('agent-studio');
                      }}
                      className="text-[#524E5E] hover:text-[#0F0E17] font-semibold flex items-center gap-1"
                    >
                      <FileCode2 className="w-3 h-3" />
                      <span>Script</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SolidCard>
      </div>

      {/* Recent Calls Live Feed & Leads Ticker Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Calls Feed */}
        <SolidCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F0E17]">Recent Live Calls</h3>
              <p className="text-xs text-[#524E5E]">Live transcript inspect and audio diagnostics</p>
            </div>
            <button
              onClick={() => onNavigate('calls')}
              className="text-xs text-[#6344E7] hover:text-[#5034CE] font-semibold flex items-center gap-1"
            >
              <span>All Calls</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E4E2EB] text-[10px] font-bold text-[#8C879A] uppercase tracking-wider">
                  <th className="pb-2.5">Caller / Contact</th>
                  <th className="pb-2.5">Agent</th>
                  <th className="pb-2.5">Direction</th>
                  <th className="pb-2.5 font-mono">Duration</th>
                  <th className="pb-2.5">Outcome</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E2EB]">
                {calls.slice(0, 4).map((call) => (
                  <tr key={call.id} className="hover:bg-[#FAF9FD] transition-colors">
                    <td className="py-3">
                      <div className="font-semibold text-[#0F0E17]">{call.callerName}</div>
                      <div className="text-[11px] font-mono text-[#524E5E]">{call.callerPhone}</div>
                    </td>
                    <td className="py-3 text-[#524E5E] font-medium">{call.agentName}</td>
                    <td className="py-3">
                      <StatusBadge status={call.direction} size="xs" />
                    </td>
                    <td className="py-3 font-mono text-[#0F0E17]">{call.formattedDuration}</td>
                    <td className="py-3">
                      <span className="text-xs text-[#524E5E] truncate max-w-[180px] block">
                        {call.outcome}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedCallId(call.id);
                          onNavigate('calls');
                        }}
                        className="text-xs font-semibold text-[#6344E7] hover:text-[#5034CE] hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SolidCard>

        {/* Realtime Lead Stream */}
        <SolidCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F0E17]">AI Lead Stream</h3>
              <p className="text-xs text-[#524E5E]">Extracted BANT leads from calls</p>
            </div>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs text-[#6344E7] hover:text-[#5034CE] font-semibold flex items-center gap-1"
            >
              <span>Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                onClick={() => onNavigate('leads')}
                className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] hover:border-[#D1CFDB] transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-xs text-[#0F0E17] group-hover:text-[#6344E7] transition-colors">
                    {lead.name}
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                    BANT {lead.bantScore}
                  </span>
                </div>
                <div className="text-[11px] text-[#524E5E] truncate">{lead.company}</div>
                <div className="text-[10px] text-[#8C879A] mt-1.5 flex items-center justify-between">
                  <span>{lead.agentName}</span>
                  <span>{lead.lastCallDate}</span>
                </div>
              </div>
            ))}
          </div>
        </SolidCard>
      </div>
    </div>
  );
}
