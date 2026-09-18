import React from 'react';
import {
  LayoutDashboard,
  Bot,
  FileCode2,
  Mic,
  Phone,
  PhoneCall,
  Megaphone,
  Users,
  CreditCard,
  Blocks,
  Settings,
  ExternalLink,
  ChevronDown,
  Zap,
  Terminal
} from 'lucide-react';
import { useWorkspace } from './context/WorkspaceContext';

export function Sidebar({
  activeTab,
  onSelectTab,
  onOpenCreateAgent,
  onOpenBuyNumber,
  onOpenAddFunds,
  onBackToLanding
}) {
  const { wallet, agents, phoneNumbers } = useWorkspace();

  const navigationGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard }
      ]
    },
    {
      group: 'AI WORKFORCE',
      items: [
        { id: 'employees', label: 'AI Employees', icon: Bot, badge: agents.length },
        { id: 'agent-studio', label: 'Script Studio', icon: FileCode2 },
        { id: 'talk-to-ai', label: 'Voice Testing', icon: Mic }
      ]
    },
    {
      group: 'TELEPHONY',
      items: [
        { id: 'phone-numbers', label: 'Virtual Numbers', icon: Phone, badge: phoneNumbers.length },
        { id: 'calls', label: 'Call History', icon: PhoneCall },
        { id: 'campaigns', label: 'Bulk Campaigns', icon: Megaphone }
      ]
    },
    {
      group: 'INSIGHTS',
      items: [
        { id: 'leads', label: 'Lead Engine', icon: Users }
      ]
    },
    {
      group: 'WORKSPACE',
      items: [
        { id: 'billing', label: 'Billing & Usage', icon: CreditCard },
        { id: 'integrations', label: 'Integrations', icon: Blocks },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    },
    {
      group: 'DEVELOPER',
      items: [
        { id: 'admin-dev', label: 'Admin & Dev Panel', icon: Terminal, badge: 'API' }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E4E2EB] flex flex-col shrink-0 select-none h-screen sticky top-0 shadow-2xs">
      {/* Workspace Branding & Selector */}
      <div className="p-4 border-b border-[#E4E2EB]">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] hover:border-[#D1CFDB] transition-all cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#0F0E17] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              V
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#0F0E17] truncate">Acme Health Corp</div>
              <div className="text-[10px] text-[#524E5E] font-mono">Enterprise Fleet</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#524E5E] shrink-0" />
        </div>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navigationGroups.map((navGroup) => (
          <div key={navGroup.group}>
            <div className="px-3 mb-1.5 text-[10px] font-bold text-[#8C879A] tracking-wider uppercase">
              {navGroup.group}
            </div>
            <div className="space-y-0.5">
              {navGroup.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#0F0E17] text-white shadow-xs font-bold'
                        : 'text-[#524E5E] hover:text-[#0F0E17] hover:bg-[#FAF9FD]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-[#524E5E] group-hover:text-[#0F0E17]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white font-bold'
                            : 'bg-[#F0EEF6] text-[#524E5E] border border-[#E4E2EB]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area: Credit Wallet & User Switcher */}
      <div className="p-3 border-t border-[#E4E2EB] space-y-2 bg-white">
        {/* Live Wallet Pill */}
        <div className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-[#524E5E] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#D97706]" />
              Talk Time
            </span>
            <span className="text-xs font-bold font-mono text-[#0F0E17]">
              {wallet.remainingMinutes.toLocaleString()} min
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-[#524E5E] font-mono">
              ${wallet.usdEquivalent.toFixed(2)} USD
            </span>
            <button
              onClick={onOpenAddFunds}
              className="text-[10px] font-semibold text-[#6344E7] hover:text-[#5034CE] hover:underline"
            >
              + Add Funds
            </button>
          </div>
        </div>

        {/* Public Landing Page Switcher */}
        <button
          onClick={onBackToLanding}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-[#524E5E] hover:text-[#0F0E17] hover:bg-[#FAF9FD] border border-[#E4E2EB] active:scale-[0.98] transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Site</span>
        </button>
      </div>
    </aside>
  );
}
