import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Clock,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Settings,
  Phone,
  Radio,
  ArrowRight
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { Modal } from '../ui/Modal';
import { useWorkspace } from '../context/WorkspaceContext';

export function CampaignsModule() {
  const { campaigns, createCampaign, toggleCampaignStatus, agents, phoneNumbers } = useWorkspace();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Wizard state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    objective: 'Reactivate past customers with personalized promotion',
    agentId: agents[0]?.id || '',
    contactsCount: 1500,
    concurrencyLimit: 20,
    callingHours: '09:00 - 18:00 (Local Recipient Time)'
  });

  const handleLaunch = () => {
    createCampaign({
      name: formData.name || 'New Outbound Campaign',
      objective: formData.objective,
      agentId: formData.agentId,
      totalContacts: formData.contactsCount,
      concurrencyLimit: formData.concurrencyLimit,
      callingHours: formData.callingHours
    });
    setIsCreateModalOpen(false);
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
            Bulk Outbound Campaigns ({campaigns.length})
          </h2>
          <p className="text-xs text-[#A19EAD] mt-0.5">
            Automate phone outreach at scale with AI agents, smart pacing, and Answering Machine Detection (AMD).
          </p>
        </div>

        <TactileButton
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          icon={Plus}
          size="md"
        >
          New Campaign
        </TactileButton>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((camp) => (
          <SolidCard key={camp.id} className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262438]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-center text-[#6344E7]">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#F7F7FB]">{camp.name}</h3>
                    <StatusBadge status={camp.status} size="xs" />
                  </div>
                  <div className="text-xs text-[#A19EAD] mt-0.5">
                    Agent: <span className="font-semibold text-[#F7F7FB]">{camp.agentName}</span> • Number: <span className="font-mono">{camp.assignedNumber}</span>
                  </div>
                </div>
              </div>

              {/* Pause / Resume Action */}
              <div className="flex items-center gap-2">
                <TactileButton
                  size="sm"
                  variant={camp.status === 'running' ? 'secondary' : 'primary'}
                  icon={camp.status === 'running' ? Pause : Play}
                  onClick={() => toggleCampaignStatus(camp.id)}
                >
                  {camp.status === 'running' ? 'Pause Campaign' : 'Resume Dialing'}
                </TactileButton>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-xl bg-[#111019] border border-[#262438] text-center font-mono">
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Total Contacts</span>
                <span className="text-sm font-bold text-[#F7F7FB]">{camp.totalContacts.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Answer Rate</span>
                <span className="text-sm font-bold text-[#22C55E]">{camp.answerRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Connected Calls</span>
                <span className="text-sm font-bold text-[#F7F7FB]">{camp.connectedCalls}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Leads Generated</span>
                <span className="text-sm font-bold text-[#6344E7]">{camp.leadsGenerated}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6E6B7B] uppercase block">Cost Incurred</span>
                <span className="text-sm font-bold text-[#F7F7FB]">{camp.costIncurred}</span>
              </div>
            </div>

            {/* Progress Bar & Concurrency Gauge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#A19EAD]">
                <span>Progress ({camp.completedCalls} / {camp.totalContacts} completed)</span>
                <span className="font-mono font-bold text-[#F7F7FB]">{camp.progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-[#111019] rounded-full overflow-hidden border border-[#262438]">
                <div
                  style={{ width: `${camp.progressPercent}%` }}
                  className="h-full bg-[#6344E7] rounded-full transition-all"
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#6E6B7B] font-mono pt-1">
                <span>Concurrency: {camp.concurrencyLimit} simultaneous lines</span>
                <span>{camp.callingHours}</span>
              </div>
            </div>
          </SolidCard>
        ))}
      </div>

      {/* CREATE CAMPAIGN WIZARD MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Launch Outbound Dialing Campaign"
        subtitle="Configure target audience, assign voice agent, and set pacing parameters."
        maxWidth="max-w-xl"
      >
        <div className="space-y-5 text-xs">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#F7F7FB] mb-1">Campaign Title *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Q4 Dental Hygiene Recall"
                  className="w-full bg-[#181724] border border-[#262438] rounded-xl p-2.5 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#F7F7FB] mb-1">Select AI Employee</label>
                <select
                  value={formData.agentId}
                  onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                  className="w-full bg-[#181724] border border-[#262438] rounded-xl p-2.5 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} — {a.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Contacts CSV */}
              <div className="p-6 rounded-xl border-2 border-dashed border-[#262438] bg-[#181724] text-center">
                <FileSpreadsheet className="w-8 h-8 text-[#6344E7] mx-auto mb-2" />
                <h4 className="font-bold text-[#F7F7FB]">Upload Contact List CSV</h4>
                <p className="text-[11px] text-[#A19EAD] mt-1">
                  Columns: phone, contact_name, service_type, appointment_date
                </p>
                <button
                  type="button"
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[#6344E7]/15 text-[#6344E7] font-semibold border border-[#6344E7]/30 hover:bg-[#6344E7]/25 transition-all"
                >
                  Select contacts.csv (1,500 rows loaded)
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <TactileButton variant="primary" size="sm" onClick={() => setStep(2)}>
                  Next: Pacing & Compliance
                </TactileButton>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#F7F7FB] mb-1">
                  Max Concurrent Lines: {formData.concurrencyLimit} calls
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={formData.concurrencyLimit}
                  onChange={(e) => setFormData({ ...formData, concurrencyLimit: parseInt(e.target.value) })}
                  className="w-full accent-[#6344E7]"
                />
                <span className="text-[10px] text-[#6E6B7B] mt-1 block font-mono">
                  Controls how many calls dial simultaneously. Paced to avoid carrier line congestion.
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#F7F7FB] mb-1">
                  TCPA Calling Hours Window
                </label>
                <input
                  type="text"
                  value={formData.callingHours}
                  onChange={(e) => setFormData({ ...formData, callingHours: e.target.value })}
                  className="w-full bg-[#181724] border border-[#262438] rounded-xl p-2.5 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#181724] border border-[#262438] space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-[#A19EAD]">
                  <span>Total Contacts</span>
                  <span className="text-[#F7F7FB]">1,500</span>
                </div>
                <div className="flex justify-between text-[#A19EAD]">
                  <span>Est. Talk Time</span>
                  <span className="text-[#F7F7FB]">~3,200 min</span>
                </div>
                <div className="flex justify-between text-[#A19EAD]">
                  <span>Est. Total Cost</span>
                  <span className="font-bold text-[#22C55E]">$152.00 USD</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#262438]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#A19EAD] hover:text-[#F7F7FB]"
                >
                  Back
                </button>
                <TactileButton variant="primary" size="md" onClick={handleLaunch}>
                  Launch Outbound Campaign
                </TactileButton>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
