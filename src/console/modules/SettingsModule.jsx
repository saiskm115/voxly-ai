import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Key,
  Users,
  Copy,
  CheckCircle2,
  Lock,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { TactileButton } from '../ui/TactileButton';

export function SettingsModule() {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [piiMasking, setPiiMasking] = useState(true);
  const [callRetention, setCallRetention] = useState('60');

  const teamMembers = [
    { name: 'Sarah Connor', email: 'sarah@acmehealth.com', role: 'Owner' },
    { name: 'Dr. John Patel', email: 'dr.patel@summitdental.com', role: 'Admin' },
    { name: 'Michael Scott', email: 'michael@acmehealth.com', role: 'Call Supervisor' }
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText('vox_live_948f102a8b9193dc0182');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
          Workspace Settings & Security
        </h2>
        <p className="text-xs text-[#A19EAD] mt-0.5">
          Manage team access permissions, developer API keys, and HIPAA/PCI-DSS PII data masking.
        </p>
      </div>

      {/* Developer API Keys */}
      <SolidCard className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#F7F7FB] flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-[#6344E7]" />
              <span>Production API Key</span>
            </h3>
            <p className="text-[11px] text-[#A19EAD]">Used to trigger outbound calls and fetch transcripts programmatically.</p>
          </div>
          <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
            Active
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-between gap-4 font-mono text-xs">
          <span className="text-[#F7F7FB] truncate">vox_live_948f102a8b9193dc0182</span>
          <button
            type="button"
            onClick={handleCopyKey}
            className="flex items-center gap-1 text-[#6344E7] hover:text-[#7557F8] font-bold text-xs"
          >
            {apiKeyCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{apiKeyCopied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </SolidCard>

      {/* Privacy & PII Data Protection */}
      <SolidCard className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-[#F7F7FB] flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Compliance & PII Data Masking</span>
          </h3>
          <p className="text-[11px] text-[#A19EAD]">Complies with PCI-DSS Level 1 and HIPAA Privacy Rules for voice transcripts.</p>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F7F7FB] block">Automatic Transcript Redaction</span>
              <span className="text-[11px] text-[#A19EAD]">Mask credit card numbers, SSNs, and security codes in logs.</span>
            </div>
            <button
              type="button"
              onClick={() => setPiiMasking(!piiMasking)}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                piiMasking ? 'bg-[#22C55E]' : 'bg-[#262438]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  piiMasking ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F7F7FB] block">Audio Recording Retention</span>
              <span className="text-[11px] text-[#A19EAD]">Automatically purge raw audio recordings after specified days.</span>
            </div>
            <select
              value={callRetention}
              onChange={(e) => setCallRetention(e.target.value)}
              className="bg-[#181724] border border-[#262438] rounded-lg px-3 py-1 text-xs text-[#F7F7FB] font-semibold focus:outline-none focus:border-[#6344E7]"
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days (Standard)</option>
              <option value="90">90 Days</option>
              <option value="never">Retain Indefinitely</option>
            </select>
          </div>
        </div>
      </SolidCard>

      {/* Team Access (RBAC) */}
      <SolidCard className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#F7F7FB] flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#A19EAD]" />
              <span>Workspace Members & Roles</span>
            </h3>
            <p className="text-[11px] text-[#A19EAD]">Invite supervisors, administrators, and prompt engineers.</p>
          </div>
          <TactileButton size="xs" variant="primary" icon={Plus}>
            Invite Member
          </TactileButton>
        </div>

        <div className="space-y-2">
          {teamMembers.map((m) => (
            <div
              key={m.email}
              className="p-3 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-[#F7F7FB]">{m.name}</div>
                <div className="text-[11px] text-[#6E6B7B]">{m.email}</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181724] text-[#A19EAD] border border-[#262438]">
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </SolidCard>
    </div>
  );
}
