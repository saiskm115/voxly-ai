import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { ChevronDown, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FAF9FD]/85 backdrop-blur-md shadow-sm border-b border-[#7657E8]/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo matching reference: soundwave icon + Voxly */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7657E8] to-[#B18CFE] flex items-center justify-center shadow-md shadow-[#7657E8]/25 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
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
          <span className="text-2xl font-extrabold tracking-tight text-[#171522]">
            Voxly
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#6F6B7D] hover:text-[#171522] transition-colors py-2"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === link.name ? 'rotate-180 text-[#7657E8]' : ''
                    }`}
                  />
                )}
              </a>

              {/* Dropdown Menu */}
              {link.dropdown && activeDropdown === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50">
                  <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-3 shadow-xl shadow-[#7657E8]/10 border border-[#7657E8]/12 space-y-1">
                    {link.dropdown.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block p-2.5 rounded-xl hover:bg-[#EDE7FF]/60 transition-colors group"
                      >
                        <div className="text-xs font-bold text-[#171522] group-hover:text-[#7657E8] transition-colors">
                          {subItem.title}
                        </div>
                        <div className="text-[11px] text-[#6F6B7D] mt-0.5">
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

        {/* Right CTA Actions matching reference */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={onWatchDemo}
            className="text-sm font-semibold text-[#6F6B7D] hover:text-[#171522] transition-colors px-2 py-1"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6B46E5] hover:to-[#8E6DF5] shadow-md shadow-[#7657E8]/30 hover:shadow-lg hover:shadow-[#7657E8]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#171522] hover:bg-[#EDE7FF]/50 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#7657E8]/10 px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-[#171522] hover:text-[#7657E8]"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#7657E8]/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWatchDemo();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#6F6B7D] rounded-xl hover:bg-[#EDE7FF]/50"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] text-center shadow-md shadow-[#7657E8]/25"
            >
              Get Started →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
