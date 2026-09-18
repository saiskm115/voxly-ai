import React, { useState, useEffect } from 'react';
import {
  FileCode2,
  Volume2,
  Phone,
  BookOpen,
  Save,
  Play,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { useWorkspace } from '../context/WorkspaceContext';

export function AgentStudioModule({ onNavigate, onOpenBuyNumber }) {
  const {
    agents,
    selectedAgentId,
    setSelectedAgentId,
    selectedAgent,
    updateAgent
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState('script');
  const [isSaved, setIsSaved] = useState(false);

  // Local editor form state
  const [formData, setFormData] = useState({
    name: selectedAgent.name,
    role: selectedAgent.role,
    greeting: selectedAgent.greeting,
    script: selectedAgent.script,
    dynamicVariables: selectedAgent.dynamicVariables || [],
    objectionRules: selectedAgent.objectionRules || [],
    boundaries: selectedAgent.boundaries || [],
    voice: { ...selectedAgent.voice },
    language: selectedAgent.language
  });

  useEffect(() => {
    if (selectedAgent) {
      setFormData({
        name: selectedAgent.name,
        role: selectedAgent.role,
        greeting: selectedAgent.greeting,
        script: selectedAgent.script,
        dynamicVariables: selectedAgent.dynamicVariables || [],
        objectionRules: selectedAgent.objectionRules || [],
        boundaries: selectedAgent.boundaries || [],
        voice: { ...selectedAgent.voice },
        language: selectedAgent.language
      });
    }
  }, [selectedAgentId, selectedAgent]);

  // Handle Save
  const handleSave = () => {
    updateAgent(selectedAgent.id, formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Variable chip insertion into script cursor
  const handleInsertVariable = (varName) => {
    setFormData((prev) => ({
      ...prev,
      script: `${prev.script}\n{{${varName}}}`
    }));
  };

  const handleAddObjection = () => {
    setFormData((prev) => ({
      ...prev,
      objectionRules: [
        ...prev.objectionRules,
        { trigger: 'Customer concern here...', response: 'AI response script here...' }
      ]
    }));
  };

  const handleRemoveObjection = (index) => {
    setFormData((prev) => ({
      ...prev,
      objectionRules: prev.objectionRules.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Workbench Header: Agent Switcher, Status & Save */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E4E2EB] shadow-craft-xs">
        {/* Left: Agent Avatar & Selector */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F0EEF6] border border-[#E4E2EB] flex items-center justify-center text-[#0F0E17] font-bold text-lg shadow-2xs">
            {selectedAgent.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-2.5 py-1 text-sm font-bold text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
              <StatusBadge status={selectedAgent.status} size="xs" />
            </div>
            <div className="text-xs text-[#524E5E] mt-1">
              Assigned: <span className="font-mono font-semibold text-[#0F0E17]">{selectedAgent.assignedNumber || 'None (Pool)'}</span>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <TactileButton
            variant="secondary"
            size="sm"
            icon={Play}
            onClick={() => onNavigate('talk-to-ai')}
          >
            Test Live Voice
          </TactileButton>

          <TactileButton
            variant="primary"
            size="sm"
            icon={isSaved ? CheckCircle2 : Save}
            onClick={handleSave}
          >
            {isSaved ? 'Saved!' : 'Save Changes'}
          </TactileButton>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white border border-[#E4E2EB] overflow-x-auto shadow-craft-xs">
        {[
          { id: 'script', label: 'Script & Conversation Flow', icon: FileCode2 },
          { id: 'voice', label: 'Voice & Acoustic Tuning', icon: Volume2 },
          { id: 'telephony', label: 'Phone & Routing', icon: Phone },
          { id: 'knowledge', label: 'Knowledge Base & FAQs', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0F0E17] text-white shadow-xs font-bold'
                  : 'text-[#524E5E] hover:text-[#0F0E17] hover:bg-[#FAF9FD]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SCRIPT & CONVERSATION FLOW */}
      {activeTab === 'script' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Opening Greeting */}
          <SolidCard>
            <label className="block text-xs font-bold text-[#0F0E17] mb-1.5">
              Opening Inbound Greeting
            </label>
            <input
              type="text"
              value={formData.greeting}
              onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
              className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-3.5 py-2.5 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
            />
            <p className="text-[11px] text-[#524E5E] mt-1.5">
              Synthesized within 280ms of call connect before the caller speaks.
            </p>
          </SolidCard>

          {/* Script Editor with Dynamic Variables Ribbon */}
          <SolidCard>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xs font-bold text-[#0F0E17]">Agent Prompt & Script Directives</h3>
                <p className="text-[11px] text-[#524E5E]">Full instructions governing conversation flow, tone, and goals.</p>
              </div>

              {/* Dynamic Variables Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[#8C879A] uppercase font-bold tracking-wider mr-1">
                  Inject:
                </span>
                {['caller_name', 'service_type', 'preferred_date', 'insurance_carrier'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleInsertVariable(v)}
                    className="px-2.5 py-1 rounded-lg bg-[#F0EEF6] border border-[#E4E2EB] hover:border-[#6344E7] text-[10px] font-mono text-[#6344E7] hover:text-[#5034CE] transition-all font-semibold"
                  >
                    + {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={10}
              value={formData.script}
              onChange={(e) => setFormData({ ...formData, script: e.target.value })}
              className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-4 text-xs text-[#0F0E17] font-mono leading-relaxed focus:outline-none focus:border-[#6344E7] transition-colors"
            />

            <div className="flex items-center justify-between text-[11px] text-[#524E5E] font-mono mt-2">
              <span>Tokens: ~{Math.floor(formData.script.length / 4)} tokens (Cached)</span>
              <span>Estimated TTFT: ~160ms</span>
            </div>
          </SolidCard>

          {/* Objection Handling Rules */}
          <SolidCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#0F0E17]">Objection Handling Rules</h3>
                <p className="text-[11px] text-[#524E5E]">Deterministic responses triggered when customer raises specific hesitations.</p>
              </div>
              <button
                type="button"
                onClick={handleAddObjection}
                className="text-xs font-semibold text-[#6344E7] hover:text-[#5034CE] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Objection Rule</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.objectionRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] grid grid-cols-1 sm:grid-cols-2 gap-3 relative group"
                >
                  <div>
                    <span className="text-[10px] text-[#8C879A] uppercase font-bold block mb-1">
                      If Caller Mentions / Asks:
                    </span>
                    <input
                      type="text"
                      value={rule.trigger}
                      onChange={(e) => {
                        const next = [...formData.objectionRules];
                        next[idx].trigger = e.target.value;
                        setFormData({ ...formData, objectionRules: next });
                      }}
                      className="w-full bg-white border border-[#E4E2EB] rounded-lg px-2.5 py-1 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C879A] uppercase font-bold block mb-1">
                      Agent Response Script:
                    </span>
                    <input
                      type="text"
                      value={rule.response}
                      onChange={(e) => {
                        const next = [...formData.objectionRules];
                        next[idx].response = e.target.value;
                        setFormData({ ...formData, objectionRules: next });
                      }}
                      className="w-full bg-white border border-[#E4E2EB] rounded-lg px-2.5 py-1 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveObjection(idx)}
                    className="absolute top-2 right-2 p-1 text-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </SolidCard>
        </div>
      )}

      {/* TAB 2: VOICE & ACOUSTIC TUNING */}
      {activeTab === 'voice' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <SolidCard>
            <h3 className="text-xs font-bold text-[#0F0E17] mb-4">Voice Engine Selection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0F0E17] mb-1">
                  Engine Provider
                </label>
                <select
                  value={formData.voice.provider}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voice: { ...formData.voice, provider: e.target.value }
                    })
                  }
                  className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-2.5 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                >
                  <option value="Cartesia">Cartesia Sonic (90ms Latency — Recommended)</option>
                  <option value="ElevenLabs">ElevenLabs Turbo v2.5 (140ms — High Realism)</option>
                  <option value="Deepgram">Deepgram Aura (110ms — Crisp Phone Articulation)</option>
                  <option value="PlayHT">PlayHT 3.0-mini (130ms)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F0E17] mb-1">
                  Language & Dialect
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-2.5 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                >
                  <option value="English (US & UK)">English (US & UK)</option>
                  <option value="Indian English">Indian English</option>
                  <option value="Telugu & English">Telugu & English</option>
                  <option value="Hindi & Hinglish">Hindi & Hinglish</option>
                  <option value="Spanish">Spanish (Latin America)</option>
                </select>
              </div>
            </div>
          </SolidCard>

          <SolidCard>
            <h3 className="text-xs font-bold text-[#0F0E17] mb-4">Acoustic Calibration Sliders</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#0F0E17]">Speaking Speed</span>
                  <span className="font-mono text-[#6344E7] font-bold">{formData.voice.speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.02"
                  value={formData.voice.speed}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voice: { ...formData.voice, speed: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-[#6344E7]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#0F0E17]">Pitch Modulation</span>
                  <span className="font-mono text-[#6344E7] font-bold">{formData.voice.pitch > 0 ? `+${formData.voice.pitch}` : formData.voice.pitch}</span>
                </div>
                <input
                  type="range"
                  min="-0.15"
                  max="0.15"
                  step="0.01"
                  value={formData.voice.pitch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voice: { ...formData.voice, pitch: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-[#6344E7]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#0F0E17]">Stability & Consistency</span>
                  <span className="font-mono text-[#6344E7] font-bold">{formData.voice.stability}</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1.0"
                  step="0.05"
                  value={formData.voice.stability}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voice: { ...formData.voice, stability: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-[#6344E7]"
                />
              </div>
            </div>
          </SolidCard>
        </div>
      )}

      {/* TAB 3: TELEPHONY & ROUTING */}
      {activeTab === 'telephony' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <SolidCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#0F0E17]">Assigned Phone Number</h3>
                <p className="text-[11px] text-[#524E5E]">The virtual DID routed directly to this voice agent.</p>
              </div>

              <TactileButton
                variant="secondary"
                size="sm"
                icon={Phone}
                onClick={onOpenBuyNumber}
              >
                Change / Buy Number
              </TactileButton>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] flex items-center justify-between">
              <div>
                <div className="font-mono font-bold text-sm text-[#0F0E17]">
                  {selectedAgent.assignedNumber || 'No number assigned'}
                </div>
                <div className="text-[11px] text-[#524E5E] mt-0.5">
                  Inbound PSTN & Outbound Caller ID
                </div>
              </div>

              <StatusBadge status={selectedAgent.assignedNumber ? 'Active' : 'Idle'} size="xs" />
            </div>
          </SolidCard>

          <SolidCard>
            <h3 className="text-xs font-bold text-[#0F0E17] mb-3">Inbound Call Routing Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F0E17] mb-1">Active Business Hours</label>
                <input
                  type="text"
                  defaultValue="08:00 - 18:00 (PST)"
                  className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-2.5 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F0E17] mb-1">After-Hours Fallback Action</label>
                <select
                  defaultValue="voicemail"
                  className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-2.5 text-xs text-[#0F0E17] focus:outline-none focus:border-[#6344E7] transition-colors"
                >
                  <option value="voicemail">Take Voicemail & Transcribe</option>
                  <option value="transfer">Warm Transfer to Human On-Call</option>
                  <option value="ai_always">Let AI Answer 24/7</option>
                </select>
              </div>
            </div>
          </SolidCard>
        </div>
      )}

      {/* TAB 4: KNOWLEDGE BASE & FAQS */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <SolidCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#0F0E17]">Attached Knowledge Documents</h3>
                <p className="text-[11px] text-[#524E5E]">Vector chunks retrieved in real-time when callers ask business questions.</p>
              </div>
              <TactileButton variant="secondary" size="sm" icon={Plus}>
                Upload Document
              </TactileButton>
            </div>

            <div className="space-y-2">
              {(selectedAgent.knowledgeSources || []).map((doc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#6344E7]" />
                    <span className="font-semibold text-[#0F0E17]">{doc}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#047857]">Indexed & Active</span>
                </div>
              ))}
            </div>
          </SolidCard>
        </div>
      )}
    </div>
  );
}
