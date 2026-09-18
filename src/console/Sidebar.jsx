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
  Plus,
  Zap
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
    }
  ];

  return (
    <aside className="w-64 bg-[#111019] border-r border-[#262438] flex flex-col shrink-0 select-none h-screen sticky top-0">
      {/* Workspace Branding & Selector */}
      <div className="p-4 border-b border-[#262438]">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#181724] border border-[#262438] hover:border-[#3D3A55] transition-all cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#6344E7] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              V
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#F7F7FB] truncate">Acme Health Corp</div>
              <div className="text-[10px] text-[#A19EAD] font-mono">Enterprise Fleet</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#A19EAD] shrink-0" />
        </div>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navigationGroups.map((navGroup) => (
          <div key={navGroup.group}>
            <div className="px-3 mb-1.5 text-[10px] font-bold text-[#6E6B7B] tracking-wider uppercase">
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
                        ? 'bg-[#6344E7] text-white shadow-xs font-bold'
                        : 'text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#181724]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-[#A19EAD] group-hover:text-[#F7F7FB]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white font-bold'
                            : 'bg-[#181724] text-[#A19EAD] border border-[#262438]'
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
      <div className="p-3 border-t border-[#262438] space-y-2 bg-[#111019]">
        {/* Live Wallet Pill */}
        <div className="p-3 rounded-xl bg-[#181724] border border-[#262438]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-[#A19EAD] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#EAB308]" />
              Talk Time
            </span>
            <span className="text-xs font-bold font-mono text-[#F7F7FB]">
              {wallet.remainingMinutes.toLocaleString()} min
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-[#6E6B7B] font-mono">
              ${wallet.usdEquivalent.toFixed(2)} USD
            </span>
            <button
              onClick={onOpenAddFunds}
              className="text-[10px] font-semibold text-[#6344E7] hover:text-[#7557F8] hover:underline"
            >
              + Add Funds
            </button>
          </div>
        </div>

        {/* Public Landing Page Switcher */}
        <button
          onClick={onBackToLanding}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-[#A19EAD] hover:text-[#F7F7FB] hover:bg-[#181724] border border-[#262438] transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Site</span>
        </button>
      </div>
    </aside>
  );
}
