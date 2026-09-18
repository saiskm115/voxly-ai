import React, { useState } from 'react';
import {
  Phone,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Settings,
  Bot,
  Globe,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TactileButton } from '../ui/TactileButton';
import { Modal } from '../ui/Modal';
import { useWorkspace } from '../context/WorkspaceContext';

export function PhoneNumbersModule({ isBuyModalOpen, onCloseBuyModal, onOpenBuyModal }) {
  const {
    phoneNumbers,
    agents,
    availableCatalog,
    buyPhoneNumber,
    assignNumberToAgent,
    releasePhoneNumber,
    buyNumberPreselectedAgent
  } = useWorkspace();

  // Buy Modal Form State
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedType, setSelectedType] = useState('Local DID');
  const [searchAreaCode, setSearchAreaCode] = useState('');
  const [targetAgentId, setTargetAgentId] = useState(buyNumberPreselectedAgent || '');
  const [purchasedSuccess, setPurchasedSuccess] = useState(null);

  // Filter available numbers catalog
  const filteredCatalog = availableCatalog.filter((item) => {
    const matchesCountry = item.country === selectedCountry;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesArea = !searchAreaCode || item.areaCode.includes(searchAreaCode) || item.number.includes(searchAreaCode);
    return matchesCountry && matchesType && matchesArea;
  });

  const handleBuyNumber = (catalogItem) => {
    const bought = buyPhoneNumber(catalogItem, targetAgentId || null);
    setPurchasedSuccess(bought.number);
    setTimeout(() => {
      setPurchasedSuccess(null);
      onCloseBuyModal();
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
            Virtual Phone Numbers ({phoneNumbers.length})
          </h2>
          <p className="text-xs text-[#A19EAD] mt-0.5">
            Buy local DIDs and toll-free numbers across 40+ countries and connect them directly to your AI agents.
          </p>
        </div>

        <TactileButton
          onClick={onOpenBuyModal}
          variant="primary"
          icon={Plus}
          size="md"
        >
          Buy Phone Number
        </TactileButton>
      </div>

      {/* Numbers Inventory Table Card */}
      <SolidCard padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#262438] bg-[#111019] text-[10px] font-bold text-[#6E6B7B] uppercase tracking-wider">
                <th className="py-3 px-5">Phone Number</th>
                <th className="py-3 px-4">Location / Type</th>
                <th className="py-3 px-4">Assigned AI Employee</th>
                <th className="py-3 px-4 font-mono">Monthly Rate</th>
                <th className="py-3 px-4 font-mono">Usage (Mins)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262438]">
              {phoneNumbers.map((num) => (
                <tr key={num.id} className="hover:bg-[#111019]/50 transition-colors">
                  {/* Number & Capabilities */}
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-sm text-[#F7F7FB] flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#6344E7]" />
                      <span>{num.number}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {num.capabilities.map((cap) => (
                        <span key={cap} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#111019] text-[#A19EAD] border border-[#262438]">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Locality */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#F7F7FB]">{num.locality}</div>
                    <div className="text-[11px] text-[#6E6B7B]">{num.country} • {num.type}</div>
                  </td>

                  {/* Assigned Agent Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={num.assignedAgentId || ''}
                      onChange={(e) => assignNumberToAgent(num.id, e.target.value)}
                      className="bg-[#111019] border border-[#262438] hover:border-[#3D3A55] rounded-xl px-2.5 py-1.5 text-xs text-[#F7F7FB] font-medium focus:outline-none focus:border-[#6344E7]"
                    >
                      <option value="">Unassigned (Pool)</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name} ({agent.role})
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Monthly Cost */}
                  <td className="py-4 px-4 font-mono text-[#A19EAD]">
                    ${num.monthlyCost.toFixed(2)}/mo
                  </td>

                  {/* Minutes Used */}
                  <td className="py-4 px-4 font-mono font-bold text-[#F7F7FB]">
                    {num.usageMinutesThisMonth.toLocaleString()} min
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <StatusBadge status={num.status} size="xs" />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Release ${num.number}? It will be returned to the carrier pool.`)) {
                          releasePhoneNumber(num.id);
                        }
                      }}
                      className="text-xs font-semibold text-[#EF4444] hover:underline"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SolidCard>

      {/* BUY VIRTUAL NUMBER MODAL */}
      <Modal
        isOpen={isBuyModalOpen}
        onClose={onCloseBuyModal}
        title="Buy Virtual Telephone Number"
        subtitle="Search carrier inventory and instantly provision a virtual DID linked to an AI agent."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          {purchasedSuccess ? (
            <div className="p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-[#F7F7FB]">Number Successfully Provisioned!</h3>
              <p className="font-mono text-sm text-[#6344E7]">{purchasedSuccess}</p>
              <p className="text-xs text-[#A19EAD]">Inbound calls will now route directly to your selected AI agent.</p>
            </div>
          ) : (
            <>
              {/* Search Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#181724] border border-[#262438]">
                {/* Country */}
                <div>
                  <label className="block text-[10px] font-bold text-[#6E6B7B] uppercase mb-1">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-[#111019] border border-[#262438] rounded-lg p-2 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                  >
                    <option value="US">United States (+1)</option>
                    <option value="CA">Canada (+1)</option>
                    <option value="GB">United Kingdom (+44)</option>
                    <option value="AU">Australia (+61)</option>
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-[10px] font-bold text-[#6E6B7B] uppercase mb-1">Number Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-[#111019] border border-[#262438] rounded-lg p-2 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                  >
                    <option value="Local DID">Local DID (Area Code)</option>
                    <option value="Toll-Free">Toll-Free (800 / 888)</option>
                    <option value="All">All Types</option>
                  </select>
                </div>

                {/* Area Code */}
                <div>
                  <label className="block text-[10px] font-bold text-[#6E6B7B] uppercase mb-1">Area Code / Prefix</label>
                  <input
                    type="text"
                    value={searchAreaCode}
                    onChange={(e) => setSearchAreaCode(e.target.value)}
                    placeholder="e.g. 415, 212, 800"
                    className="w-full bg-[#111019] border border-[#262438] rounded-lg p-2 text-xs text-[#F7F7FB] focus:outline-none focus:border-[#6344E7]"
                  />
                </div>
              </div>

              {/* Direct Agent Binding Dropdown */}
              <div className="p-3 rounded-xl bg-[#181724] border border-[#262438] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#F7F7FB] block">Assign Directly to AI Employee</span>
                  <span className="text-[11px] text-[#A19EAD]">Optional: Route all inbound traffic immediately to this agent.</span>
                </div>
                <select
                  value={targetAgentId}
                  onChange={(e) => setTargetAgentId(e.target.value)}
                  className="bg-[#111019] border border-[#262438] rounded-xl px-3 py-1.5 text-xs text-[#F7F7FB] font-semibold focus:outline-none focus:border-[#6344E7]"
                >
                  <option value="">Leave Unassigned (Pool)</option>
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Available Inventory Results */}
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {filteredCatalog.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#6E6B7B]">
                    No available numbers match this search. Try area code 415 or 800.
                  </div>
                ) : (
                  filteredCatalog.map((item) => (
                    <div
                      key={item.formatted}
                      className="p-3.5 rounded-xl bg-[#181724] border border-[#262438] hover:border-[#3D3A55] flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#111019] border border-[#262438] flex items-center justify-center text-[#6344E7]">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-mono font-bold text-sm text-[#F7F7FB]">{item.number}</div>
                          <div className="text-[10px] text-[#6E6B7B]">{item.locality} • {item.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold text-[#A19EAD]">
                          ${item.fee.toFixed(2)}/mo
                        </span>
                        <TactileButton
                          size="xs"
                          variant="primary"
                          onClick={() => handleBuyNumber(item)}
                        >
                          Buy & Bind
                        </TactileButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
