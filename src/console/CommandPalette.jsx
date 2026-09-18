import React, { useState, useEffect } from 'react';
import {
  Search,
  Bot,
  Phone,
  PhoneCall,
  Users,
  Megaphone,
  CreditCard,
  Settings,
  Plus,
  ArrowRight,
  Mic
} from 'lucide-react';
import { useWorkspace } from './context/WorkspaceContext';

export function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const { agents, phoneNumbers, leads, campaigns } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'Create AI Employee', category: 'Actions', icon: Plus, action: () => onNavigate('employees', { openCreate: true }) },
    { label: 'Buy Virtual Number', category: 'Actions', icon: Phone, action: () => onNavigate('phone-numbers', { openBuy: true }) },
    { label: 'Test Voice Agent in Real-Time', category: 'Actions', icon: Mic, action: () => onNavigate('talk-to-ai') },
    { label: 'Launch Outbound Campaign', category: 'Actions', icon: Megaphone, action: () => onNavigate('campaigns', { openCreate: true }) },
    { label: 'Inspect Call Transcripts', category: 'Navigation', icon: PhoneCall, action: () => onNavigate('calls') },
    { label: 'View Lead Pipeline', category: 'Navigation', icon: Users, action: () => onNavigate('leads') },
    { label: 'Top-up Balance & Invoices', category: 'Billing', icon: CreditCard, action: () => onNavigate('billing') },
    { label: 'Workspace Settings & API Keys', category: 'Settings', icon: Settings, action: () => onNavigate('settings') }
  ];

  const filteredAgents = agents
    .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.role.toLowerCase().includes(query.toLowerCase()))
    .map((a) => ({
      label: `${a.name} — ${a.role}`,
      category: 'AI Employees',
      icon: Bot,
      action: () => onNavigate('agent-studio', { agentId: a.id })
    }));

  const filteredNumbers = phoneNumbers
    .filter((n) => n.number.includes(query) || n.assignedAgentName.toLowerCase().includes(query.toLowerCase()))
    .map((n) => ({
      label: `${n.number} (${n.assignedAgentName})`,
      category: 'Virtual Numbers',
      icon: Phone,
      action: () => onNavigate('phone-numbers')
    }));

  const filteredLeads = leads
    .filter((l) => l.name.toLowerCase().includes(query.toLowerCase()) || l.company.toLowerCase().includes(query.toLowerCase()))
    .map((l) => ({
      label: `${l.name} — ${l.company} (BANT ${l.bantScore})`,
      category: 'Leads',
      icon: Users,
      action: () => onNavigate('leads', { leadId: l.id })
    }));

  const allResults = query
    ? [...filteredAgents, ...filteredNumbers, ...filteredLeads, ...quickActions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))]
    : quickActions;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B0A10]/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-[#111019] border border-[#262438] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#262438]">
          <Search className="w-4 h-4 text-[#A19EAD] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, agent name, or search..."
            className="flex-1 bg-transparent text-sm text-[#F7F7FB] placeholder-[#6E6B7B] focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#181724] text-[#6E6B7B] border border-[#262438]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {allResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6E6B7B]">
              No results found for "{query}"
            </div>
          ) : (
            allResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={`${item.label}-${idx}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#181724] text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#181724] border border-[#262438] flex items-center justify-center text-[#A19EAD] group-hover:text-[#F7F7FB] group-hover:border-[#3D3A55] transition-all">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#F7F7FB] truncate group-hover:text-[#6344E7] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#6E6B7B]">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6E6B7B] group-hover:text-[#F7F7FB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#181724] border-t border-[#262438] flex items-center justify-between text-[11px] text-[#6E6B7B]">
          <span>Use <b>↑↓</b> to navigate</span>
          <span>Press <b>ESC</b> to close</span>
        </div>
      </div>
    </div>
  );
}
