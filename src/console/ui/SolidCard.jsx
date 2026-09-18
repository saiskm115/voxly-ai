import React from 'react';

/**
 * Emil Kowalski Craft Solid Card
 * Non-glassmorphism solid card surface with hairline #262438 border and clean padding.
 */
export function SolidCard({
  children,
  className = '',
  hover = false,
  padding = 'p-5 sm:p-6',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#181724] border border-[#262438] rounded-2xl ${padding} ${
        hover ? 'hover:border-[#3D3A55] hover:bg-[#1D1B2C] transition-all cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
