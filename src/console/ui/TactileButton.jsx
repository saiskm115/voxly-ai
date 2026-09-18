import React from 'react';

/**
 * Emil Kowalski Craft Tactile Button
 * Implements physical tactile depression (active:scale-[0.98]) with high-contrast surfaces.
 */
export function TactileButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  icon: Icon = null,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6344E7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0A10] disabled:opacity-45 disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    xs: 'px-2.5 py-1 text-[11px] rounded-lg',
    sm: 'px-3 py-1.5 text-xs rounded-xl',
    md: 'px-4 py-2 text-xs rounded-xl',
    lg: 'px-5 py-2.5 text-sm rounded-xl',
    icon: 'p-2 rounded-xl'
  };

  const variantStyles = {
    primary:
      'bg-[#6344E7] hover:bg-[#7557F8] text-white shadow-sm border border-white/10',
    white:
      'bg-white hover:bg-[#F0EEF6] text-[#0F0E17] shadow-sm border border-transparent',
    secondary:
      'bg-[#181724] hover:bg-[#222033] text-[#F7F7FB] border border-[#262438] shadow-xs',
    ghost:
      'bg-transparent hover:bg-[#181724] text-[#A19EAD] hover:text-[#F7F7FB]',
    danger:
      'bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] border border-[#EF4444]/30',
    success:
      'bg-[#22C55E]/15 hover:bg-[#22C55E]/25 text-[#22C55E] border border-[#22C55E]/30',
    outline:
      'bg-transparent hover:bg-[#181724] text-[#F7F7FB] border border-[#262438]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
