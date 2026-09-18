import React from 'react';

/**
 * StatusBadge UI Primitive
 * Restrained semantic pill indicator for agent states, call outcomes, and lead pipeline stages.
 */
export function StatusBadge({ status, size = 'sm', className = '' }) {
  const norm = String(status || '').toLowerCase();

  let styles = 'bg-[#181724] text-[#A19EAD] border-[#262438]';
  let dotColor = 'bg-[#A19EAD]';
  let label = status;

  if (norm === 'active' || norm === 'qualified' || norm === 'meeting booked' || norm === 'resolved') {
    styles = 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/25';
    dotColor = 'bg-[#22C55E]';
  } else if (norm === 'paused' || norm === 'draft' || norm === 'idle' || norm === 'new') {
    styles = 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25';
    dotColor = 'bg-[#F59E0B]';
  } else if (norm === 'inbound') {
    styles = 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/25';
    dotColor = 'bg-[#3B82F6]';
  } else if (norm === 'outbound') {
    styles = 'bg-[#A855F7]/15 text-[#A855F7] border-[#A855F7]/25';
    dotColor = 'bg-[#A855F7]';
  } else if (norm === 'unqualified' || norm === 'failed' || norm === 'cancelled') {
    styles = 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25';
    dotColor = 'bg-[#EF4444]';
  } else if (norm === 'running') {
    styles = 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/25';
    dotColor = 'bg-[#22C55E] animate-pulse';
  }

  const sizeClass = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-md border ${sizeClass} ${styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
}
