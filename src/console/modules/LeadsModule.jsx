import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  PhoneCall,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { Modal } from '../ui/Modal';
import { useWorkspace } from '../context/WorkspaceContext';

export function LeadsModule() {
  const { leads, updateLeadStage, updateLeadNotes, triggerCallToLead } = useWorkspace();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [callNotice, setCallNotice] = useState(null);

  const stages = ['New', 'Contacted', 'Qualified', 'Meeting Booked', 'Unqualified'];

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.intent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTriggerCall = (lead) => {
    triggerCallToLead(lead.id);
    setCallNotice(`Outbound AI call initiated to ${lead.name} (${lead.phone})`);
    setTimeout(() => setCallNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
            Autonomous Lead Pipeline ({leads.length})
          </h2>
          <p className="text-xs text-[#A19EAD] mt-0.5">
            Leads automatically captured, BANT-qualified, and scored by AI voice employees during phone calls.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#181724] border border-[#262438]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'kanban' ? 'bg-[#6344E7] text-white' : 'text-[#A19EAD] hover:text-[#F7F7FB]'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-[#6344E7] text-white' : 'text-[#A19EAD] hover:text-[#F7F7FB]'
              }`}
              title="Data Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Call Trigger Notification Banner */}
      {callNotice && (
        <div className="p-3.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-semibold text-[#22C55E] flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>{callNotice}</span>
          </div>
          <span className="text-[10px] font-mono">SIP INVITE Dispatched</span>
        </div>
      )}

      {/* KANBAN PIPELINE VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="flex flex-col min-w-[240px] space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#181724] border border-[#262438]">
                  <span className="text-xs font-bold text-[#F7F7FB] truncate">{stage}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#111019] text-[#A19EAD]">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 flex-1">
                  {stageLeads.map((lead) => (
                    <SolidCard
                      key={lead.id}
                      padding="p-3.5"
                      className="space-y-2.5 hover:border-[#3D3A55] transition-all cursor-pointer group"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-[#F7F7FB] group-hover:text-[#6344E7] transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-[#A19EAD] truncate">{lead.company}</div>
                        </div>

                        {/* BANT Score Badge */}
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            lead.bantScore >= 80
                              ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                              : lead.bantScore >= 50
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                              : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                          }`}
                        >
                          BANT {lead.bantScore}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#A19EAD] line-clamp-1">
                        🎯 {lead.intent}
                      </div>

                      {/* Card Bottom: Agent & Quick Call Trigger */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#262438] text-[10px] text-[#6E6B7B]">
                        <span>{lead.agentName}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTriggerCall(lead);
                          }}
                          className="flex items-center gap-1 text-[#6344E7] hover:text-[#7557F8] font-bold"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>Call</span>
                        </button>
                      </div>
                    </SolidCard>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="p-6 rounded-xl border border-dashed border-[#262438] text-center text-[11px] text-[#6E6B7B]">
                      No leads in {stage}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DATA TABLE VIEW */}
      {viewMode === 'table' && (
        <SolidCard padding="p-0" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#262438] bg-[#111019] text-[10px] font-bold text-[#6E6B7B] uppercase tracking-wider">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-3">Company</th>
                  <th className="py-3 px-3 font-mono">BANT Score</th>
                  <th className="py-3 px-3">Stage</th>
                  <th className="py-3 px-3">Intent</th>
                  <th className="py-3 px-3">Agent</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262438]">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-[#111019]/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#F7F7FB]">{lead.name}</div>
                      <div className="text-[10px] font-mono text-[#6E6B7B]">{lead.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-[#A19EAD] font-medium">{lead.company}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#22C55E]">{lead.bantScore}/100</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={lead.stage} size="xs" />
                    </td>
                    <td className="py-3 px-3 text-[#A19EAD] truncate max-w-[160px]">{lead.intent}</td>
                    <td className="py-3 px-3 text-[#6E6B7B]">{lead.agentName}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriggerCall(lead);
                        }}
                        className="text-xs font-semibold text-[#6344E7] hover:underline"
                      >
                        Call Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SolidCard>
      )}

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={selectedLead.name}
          subtitle={`Captured by ${selectedLead.agentName} • ${selectedLead.source}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            {/* Stage Selector Ribbon */}
            <div className="p-3 rounded-xl bg-[#181724] border border-[#262438] flex items-center justify-between">
              <span className="font-bold text-[#F7F7FB]">Pipeline Stage:</span>
              <select
                value={selectedLead.stage}
                onChange={(e) => {
                  updateLeadStage(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, stage: e.target.value });
                }}
                className="bg-[#111019] border border-[#262438] rounded-lg px-2.5 py-1 text-xs text-[#F7F7FB] font-semibold focus:outline-none focus:border-[#6344E7]"
              >
                {stages.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#181724] border border-[#262438]">
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Phone</span>
                <span className="font-mono text-[#F7F7FB] font-semibold">{selectedLead.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Email</span>
                <span className="text-[#F7F7FB] truncate block">{selectedLead.email || 'None on file'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Company</span>
                <span className="text-[#F7F7FB] font-semibold">{selectedLead.company}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">BANT Score</span>
                <span className="font-mono font-bold text-[#22C55E]">{selectedLead.bantScore} / 100</span>
              </div>
            </div>

            {/* AI Notes */}
            <div>
              <label className="block text-xs font-bold text-[#F7F7FB] mb-1">
                AI Extracted Notes & Summary
              </label>
              <textarea
                rows={3}
                value={selectedLead.notes}
                onChange={(e) => {
                  updateLeadNotes(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, notes: e.target.value });
                }}
                className="w-full bg-[#181724] border border-[#262438] rounded-xl p-3 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
              />
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[#262438]">
              <span className="text-[11px] text-[#6E6B7B]">CRM Synced: HubSpot Deal #489</span>
              <TactileButton
                variant="primary"
                size="sm"
                icon={PhoneCall}
                onClick={() => {
                  handleTriggerCall(selectedLead);
                  setSelectedLead(null);
                }}
              >
                Trigger Outbound AI Call
              </TactileButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
