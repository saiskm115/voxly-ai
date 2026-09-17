import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#7657E8]/10 pt-16 pb-12 text-[#6F6B7D]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-[#7657E8]/10">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7657E8] to-[#B18CFE] flex items-center justify-center shadow-sm">
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
              <span className="text-xl font-extrabold tracking-tight text-[#171522]">
                Voxly
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#6F6B7D] leading-relaxed max-w-sm">
              The autonomous AI voice employee platform for high-growth revenue, support, and dispatch teams.
            </p>

            {/* Live Telephony Status Indicator */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20B486]/10 text-[#20B486] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#20B486] animate-pulse" />
                <span>All Telephony Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#builder" className="hover:text-[#7657E8] transition-colors">Voice Employee Builder</a></li>
              <li><a href="#train" className="hover:text-[#7657E8] transition-colors">Knowledge Engine</a></li>
              <li><a href="#simulator" className="hover:text-[#7657E8] transition-colors">Live Call Simulator</a></li>
              <li><a href="#pricing" className="hover:text-[#7657E8] transition-colors">Pricing & Metering</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#simulator" className="hover:text-[#7657E8] transition-colors">Lead Qualification</a></li>
              <li><a href="#simulator" className="hover:text-[#7657E8] transition-colors">Customer Support</a></li>
              <li><a href="#platform" className="hover:text-[#7657E8] transition-colors">Appointment Scheduling</a></li>
              <li><a href="#platform" className="hover:text-[#7657E8] transition-colors">DNC Compliance</a></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-[#7657E8] transition-colors">Documentation</a></li>
              <li><a href="#platform" className="hover:text-[#7657E8] transition-colors">SIP Trunk Setup</a></li>
              <li><a href="#platform" className="hover:text-[#7657E8] transition-colors">SOC2 Type II Report</a></li>
              <li><a href="#faq" className="hover:text-[#7657E8] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#171522] uppercase tracking-wider">
              Stay Informed
            </h4>
            <p className="text-xs text-[#6F6B7D]">
              Quarterly acoustic research & voice telephony release notes.
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                placeholder="work@company.com"
                className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF9FD] border border-[#7657E8]/15 focus:outline-none focus:border-[#7657E8] text-[#171522]"
              />
              <button
                className="p-2 rounded-xl bg-[#7657E8] text-white hover:bg-[#6845DF] transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F6B7D]">
          <div>
            © {new Date().getFullYear()} Voxly AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#171522]">Terms of Service</a>
            <a href="#" className="hover:text-[#171522]">Privacy Policy</a>
            <a href="#" className="hover:text-[#171522]">Security & Trust</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
