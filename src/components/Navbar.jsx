import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export function Navbar({ onGetStarted, onWatchDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'py-3 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-[#E4E2EB]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo: Clean solid neutral badge + Voxly */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#0F0E17] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0F0E17]">
            Voxly
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#524E5E] hover:text-[#0F0E17] transition-colors py-2"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === link.name ? 'rotate-180 text-[#0F0E17]' : 'text-[#524E5E]'
                    }`}
                  />
                )}
              </a>

              {/* Dropdown Menu: High-craft solid card with hairline border */}
              {link.dropdown && activeDropdown === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50">
                  <div className="bg-white rounded-xl p-2.5 shadow-xl border border-[#E4E2EB] space-y-1">
                    {link.dropdown.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block p-2.5 rounded-lg hover:bg-[#FAF9FD] transition-colors group"
                      >
                        <div className="text-xs font-semibold text-[#0F0E17] group-hover:text-[#6344E7] transition-colors">
                          {subItem.title}
                        </div>
                        <div className="text-[11px] text-[#524E5E] mt-0.5">
                          {subItem.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right CTA Actions: Tactile, high-contrast buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onWatchDemo}
            className="text-xs font-semibold text-[#524E5E] hover:text-[#0F0E17] transition-colors px-3 py-2 rounded-lg hover:bg-[#FAF9FD]"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0F0E17] hover:bg-[#232130] active:scale-[0.98] transition-all duration-150 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6344E7]"
          >
            <span>Build Your Agent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#0F0E17] hover:bg-[#FAF9FD] border border-[#E4E2EB] transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E4E2EB] px-6 py-5 space-y-4 shadow-xl">
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-[#0F0E17] hover:text-[#6344E7]"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E4E2EB] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWatchDemo();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#524E5E] rounded-xl hover:bg-[#FAF9FD] border border-[#E4E2EB]"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#0F0E17] hover:bg-[#232130] active:scale-[0.98] text-center shadow-xs"
            >
              Build Your Agent →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
