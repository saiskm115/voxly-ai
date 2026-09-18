import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible Modal Wrapper
 * Clean obsidian dark surface with subtle backdrop-blur and keyboard escape handling.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle = null,
  children,
  maxWidth = 'max-w-2xl',
  className = ''
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B0A10]/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full ${maxWidth} bg-[#111019] border border-[#262438] rounded-2xl shadow-2xl z-10 overflow-hidden my-auto ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-[#262438]">
          <div>
            <h2 id="modal-title" className="text-base sm:text-lg font-bold text-[#F7F7FB] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#A19EAD] mt-1">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#181724] border border-transparent hover:border-[#262438] transition-all"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
