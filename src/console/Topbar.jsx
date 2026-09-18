import React from 'react';
import {
  Search,
  Plus,
  Phone,
  Bell,
  Radio,
  ExternalLink,
  Bot
} from 'lucide-react';
import { TactileButton } from './ui/TactileButton';
import { useWorkspace } from './context/WorkspaceContext';

export function Topbar({
  activeTab,
  onOpenCommandPalette,
  onOpenCreateAgent,
  onOpenBuyNumber,
  user,
  onBackToLanding
}) {
  const { campaigns } = useWorkspace();
  const runningCampaign = campaigns.find((c) => c.status === 'running');

  const tabLabels = {
    overview: 'Workspace Overview',
    employees: 'AI Employees Fleet',
    'agent-studio': 'Agent Studio & Script Flow',
    'phone-numbers': 'Virtual Numbers & Routing',
    calls: 'Call Logs & Audio Inspector',
    leads: 'Autonomous Lead Pipeline',
    campaigns: 'Bulk Outbound Campaigns',
    billing: 'Wallet, Usage & Billing',
    integrations: 'Integrations & Webhooks',
    settings: 'Settings & Security',
    'talk-to-ai': 'Realtime Voice Testing Console'
  };

  return (
    <header className="h-14 bg-[#111019]/90 backdrop-blur-md border-b border-[#262438] px-5 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-[#6E6B7B] font-medium hidden sm:inline">Console</span>
        <span className="text-xs text-[#6E6B7B] hidden sm:inline">/</span>
        <h1 className="text-xs sm:text-sm font-bold text-[#F7F7FB] truncate">
          {tabLabels[activeTab] || 'Dashboard'}
        </h1>

        {runningCampaign && (
          <div className="hidden lg:flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] font-mono text-[#22C55E]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Dialing: {runningCampaign.name}</span>
          </div>
        )}
      </div>

      {/* Center Search / Command Palette Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#181724] border border-[#262438] hover:border-[#3D3A55] text-[#A19EAD] transition-all text-xs group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#6E6B7B] group-hover:text-[#A19EAD]" />
            <span>Search agents, numbers, leads, calls...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#111019] text-[#6E6B7B] border border-[#262438]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenBuyNumber}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#181724] hover:bg-[#222033] text-[#F7F7FB] border border-[#262438] transition-all active:scale-[0.98]"
        >
          <Phone className="w-3.5 h-3.5 text-[#6344E7]" />
          <span>Buy Number</span>
        </button>

        <TactileButton
          onClick={onOpenCreateAgent}
          size="sm"
          variant="primary"
          icon={Plus}
        >
          <span>Create Agent</span>
        </TactileButton>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-xl bg-[#181724] border border-[#262438] flex items-center justify-center text-xs font-mono font-bold text-[#F7F7FB]">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  );
}
