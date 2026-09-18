import React from 'react';

/**
 * MetricCard UI Primitive
 * Displays a single KPI metric with monospace numbers and percentage trend indicator.
 */
export function MetricCard({
  title,
  value,
  trend = null,
  trendLabel = 'vs last week',
  icon: Icon = null,
  subtitle = null,
  className = ''
}) {
  const isPositive = trend && trend.startsWith('+');

  return (
    <div className={`bg-[#181724] border border-[#262438] rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-[#A19EAD] tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-[#111019] border border-[#262438] flex items-center justify-center text-[#A19EAD]">
            <Icon className="w-3.5 h-3.5 text-[#A19EAD]" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-1.5">
        <span className="text-2xl sm:text-3xl font-bold font-mono text-[#F7F7FB] tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold ${
              isPositive
                ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/20'
                : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/20'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {(subtitle || trendLabel) && (
        <div className="text-[11px] text-[#6E6B7B]">
          {subtitle || trendLabel}
        </div>
      )}
    </div>
  );
}
