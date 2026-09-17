import React from 'react';

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4">
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="gradient-text-lavender">
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
