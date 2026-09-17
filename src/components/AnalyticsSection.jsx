import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Target,
  PieChart,
  Filter,
  Calendar
} from 'lucide-react';
import { PERFORMANCE_STATS } from '../data/siteContent';

export function AnalyticsSection() {
  const [activeChartTab, setActiveChartTab] = useState('calls');

  return (
    <section id="analytics" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Telemetry & Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            Your AI gets better{' '}
            <span className="gradient-text-lavender">when you can see everything.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            {PERFORMANCE_STATS.subtitle}
          </p>
        </div>

        {/* Large Top Dashboard Mockup Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#7657E8]/20 shadow-xl p-6 sm:p-10 mb-12">
          
          {/* 4 Primary Top Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[#7657E8]/10 mb-8">
            {PERFORMANCE_STATS.metrics.map((m) => (
              <div key={m.label} className="bg-[#FAF9FD] p-5 rounded-2xl border border-[#7657E8]/10">
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">
                  {m.label}
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#171522] mb-1">
                  {m.value}
                </div>
                <span className="text-xs font-semibold text-[#20B486] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {m.change}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Chart View Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'calls', label: 'Calls over time' },
                { id: 'outcomes', label: 'Outcomes' },
                { id: 'funnel', label: 'Conversion funnel' },
                { id: 'hours', label: 'Business hours' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChartTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeChartTab === tab.id
                      ? 'bg-[#7657E8] text-white shadow-sm'
                      : 'bg-[#FAF9FD] text-[#6F6B7D] hover:text-[#171522] border border-[#7657E8]/15'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-[#6F6B7D]">
              Real-time telemetry updated 3s ago
            </span>
          </div>

          {/* Chart 1: Calls Over Time */}
          {activeChartTab === 'calls' && (
            <div className="space-y-4">
              <div className="h-64 flex items-end justify-between gap-4 sm:gap-8 pt-6 pb-2 border-b border-[#7657E8]/10">
                {PERFORMANCE_STATS.charts.callsOverTime.map((item) => {
                  const heightCalls = (item.calls / 13000) * 100;
                  const heightResolved = (item.resolved / 13000) * 100;
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-1/2 bg-[#7657E8] rounded-t-lg transition-all"
                          style={{ height: `${heightCalls}%` }}
                          title={`Total Calls: ${item.calls}`}
                        />
                        <div
                          className="w-1/2 bg-[#20B486] rounded-t-lg transition-all"
                          style={{ height: `${heightResolved}%` }}
                          title={`Resolved: ${item.resolved}`}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#6F6B7D]">{item.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-6 text-xs font-bold pt-2">
                <span className="flex items-center gap-2 text-[#7657E8]">
                  <span className="w-3 h-3 rounded bg-[#7657E8]" /> Total Inbound & Outbound Calls
                </span>
                <span className="flex items-center gap-2 text-[#20B486]">
                  <span className="w-3 h-3 rounded bg-[#20B486]" /> Fully Resolved by AI (Zero Human Intervention)
                </span>
              </div>
            </div>
          )}

          {/* Chart 2: Outcomes */}
          {activeChartTab === 'outcomes' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6">
              {PERFORMANCE_STATS.charts.outcomes.map((out) => (
                <div key={out.label} className="bg-[#FAF9FD] p-6 rounded-2xl border border-[#7657E8]/15 text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-extrabold text-white mb-4 shadow-md"
                    style={{ backgroundColor: out.color }}
                  >
                    {out.pct}%
                  </div>
                  <h4 className="text-sm font-extrabold text-[#171522] mb-1">{out.label}</h4>
                  <p className="text-xs text-[#6F6B7D]">Automatic telemetry categorization</p>
                </div>
              ))}
            </div>
          )}

          {/* Chart 3: Conversion Funnel */}
          {activeChartTab === 'funnel' && (
            <div className="space-y-3 py-4 max-w-2xl mx-auto">
              {PERFORMANCE_STATS.charts.funnel.map((fn, idx) => (
                <div key={fn.stage} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#171522]">{fn.stage}</span>
                    <span className="text-[#7657E8]">{fn.count.toLocaleString()} ({fn.pct})</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#EDE7FF] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] rounded-full transition-all"
                      style={{ width: `${100 - idx * 21}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chart 4: Business Hours */}
          {activeChartTab === 'hours' && (
            <div className="py-4 text-center space-y-4">
              <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block">
                Call Volume Distribution by Hour of Day (24/7 Coverage)
              </span>
              <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5 max-w-3xl mx-auto">
                {[
                  { h: '12am', load: 15 }, { h: '2am', load: 10 }, { h: '4am', load: 12 },
                  { h: '6am', load: 25 }, { h: '8am', load: 68 }, { h: '9am', load: 95 },
                  { h: '11am', load: 98 }, { h: '1pm', load: 88 }, { h: '3pm', load: 92 },
                  { h: '5pm', load: 74 }, { h: '7pm', load: 45 }, { h: '10pm', load: 22 },
                ].map((slot) => (
                  <div key={slot.h} className="bg-[#FAF9FD] p-2 rounded-xl border border-[#7657E8]/10 text-center">
                    <div
                      className="w-full h-12 rounded-lg bg-gradient-to-t from-[#7657E8] to-[#9B7BF7] transition-all mb-1 opacity-80"
                      style={{ height: `${Math.max(16, (slot.load / 100) * 48)}px` }}
                    />
                    <span className="text-[10px] font-bold text-[#171522] block">{slot.h}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6F6B7D]">
                Voxly maintains 0-second hold times even during peak 9:00 AM – 3:00 PM enterprise traffic bursts.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
