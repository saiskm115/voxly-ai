import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ANALYTICS_DATA } from '../data/siteContent';
import { BarChart3, TrendingUp, Clock, DollarSign, Users, Award, Shield } from 'lucide-react';

export function AnalyticsSection() {
  const [activeDay, setActiveDay] = useState('Fri');

  const maxCalls = Math.max(...ANALYTICS_DATA.trends.map((t) => t.calls));

  return (
    <section className="py-24 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading
          badge="PERFORMANCE ANALYTICS"
          title="Measurable Impact on Every"
          highlight="Connected Call"
          subtitle="Real-time telemetric visibility into fleet utilization, qualification funnels, unit economics, and customer sentiment."
        />

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-[#7657E8]/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#EDE7FF] flex items-center justify-center text-[#7657E8] mb-4">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171522]">
              {ANALYTICS_DATA.totalCalls}
            </div>
            <div className="text-xs font-semibold text-[#6F6B7D] mt-1">Total Connected Calls</div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#20B486]">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% month-over-month
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#7657E8]/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#20B486]/10 flex items-center justify-center text-[#20B486] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171522]">
              {ANALYTICS_DATA.answerRate}
            </div>
            <div className="text-xs font-semibold text-[#6F6B7D] mt-1">First-Ring Pickup Rate</div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#20B486]">
              <TrendingUp className="w-3.5 h-3.5" /> STIR/SHAKEN verified
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#7657E8]/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#E5A62B]/10 flex items-center justify-center text-[#E5A62B] mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171522]">
              {ANALYTICS_DATA.avgCallDuration}
            </div>
            <div className="text-xs font-semibold text-[#6F6B7D] mt-1">Average Call Resolution</div>
            <div className="mt-3 text-[11px] font-bold text-[#7657E8]">
              Zero hold time recorded
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#7657E8]/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#5D6FEF]/10 flex items-center justify-center text-[#5D6FEF] mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#171522]">
              {ANALYTICS_DATA.humanSavings}
            </div>
            <div className="text-xs font-semibold text-[#6F6B7D] mt-1">Cost Reduction vs Reps</div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#20B486]">
              <TrendingUp className="w-3.5 h-3.5" /> $0.14/min transparent rate
            </div>
          </div>

        </div>

        {/* Volume & Qualification Trend Visualization */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#7657E8]/15 shadow-xl shadow-[#7657E8]/5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#171522] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#7657E8]" /> Weekly Call Traffic & Lead Conversion
              </h3>
              <p className="text-xs text-[#6F6B7D] mt-0.5">
                Concurrent inbound bursts automatically load-balanced across geographic SIP nodes
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#7657E8]" /> Total Inbound Calls
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#9B7BF7]/50" /> Qualified Opportunities
              </span>
            </div>
          </div>

          {/* Interactive Bar Columns */}
          <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-64 pt-6 pb-2 border-b border-[#7657E8]/10">
            {ANALYTICS_DATA.trends.map((item) => {
              const heightPercent = (item.calls / maxCalls) * 100;
              const qualPercent = (item.qualified / maxCalls) * 100;
              const isSelected = activeDay === item.day;
              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setActiveDay(item.day)}
                  className="flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  <div className="w-full max-w-[48px] flex flex-col items-center justify-end h-full relative">
                    {/* Tooltip on active */}
                    {isSelected && (
                      <div className="absolute -top-12 bg-[#171522] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md whitespace-nowrap z-10 pointer-events-none">
                        {item.calls.toLocaleString()} calls ({item.qualified.toLocaleString()} qualified)
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-xl transition-all duration-300 relative ${
                        isSelected ? 'bg-[#7657E8]' : 'bg-[#EDE7FF] group-hover:bg-[#D8D1F5]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      {/* Inner qualified portion */}
                      <div
                        className="w-full bg-[#9B7BF7] rounded-t-xl absolute bottom-0 opacity-80"
                        style={{ height: `${(item.qualified / item.calls) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-bold mt-3 ${isSelected ? 'text-[#7657E8]' : 'text-[#6F6B7D]'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
