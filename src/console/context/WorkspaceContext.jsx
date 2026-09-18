import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialAgents,
  initialPhoneNumbers,
  initialCalls,
  initialLeads,
  initialCampaigns,
  initialWallet,
  availableNumbersCatalog
} from '../data/initialWorkspaceData';
import { api } from '../../services/api';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [agents, setAgents] = useState(initialAgents);
  const [phoneNumbers, setPhoneNumbers] = useState(initialPhoneNumbers);
  const [calls, setCalls] = useState(initialCalls);
  const [leads, setLeads] = useState(initialLeads);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [wallet, setWallet] = useState(initialWallet);
  const [availableCatalog, setAvailableCatalog] = useState(availableNumbersCatalog);
  const [isLoading, setIsLoading] = useState(false);

  // Multiple Workspaces Management
  const defaultWorkspaces = [
    {
      id: 'ws-acme',
      name: 'Acme Health Corp',
      tier: 'Enterprise Fleet',
      role: 'Owner',
      activeAgents: 3,
      avatar: 'V'
    },
    {
      id: 'ws-summit',
      name: 'Summit Dental Care',
      tier: 'Professional Fleet',
      role: 'Admin',
      activeAgents: 2,
      avatar: 'S'
    },
    {
      id: 'ws-vance',
      name: 'Vance Capital Partners',
      tier: 'Scale Fleet',
      role: 'Billing Lead',
      activeAgents: 1,
      avatar: 'V'
    }
  ];

  const [workspaces, setWorkspaces] = useState(defaultWorkspaces);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState('ws-acme');
  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0];

  const switchWorkspace = (id) => {
    setCurrentWorkspaceId(id);
  };

  const createWorkspace = (name, tier = 'Starter Fleet') => {
    const newWs = {
      id: `ws-${Date.now()}`,
      name: name || 'New Organization',
      tier,
      role: 'Owner',
      activeAgents: 0,
      avatar: (name || 'N').charAt(0).toUpperCase()
    };
    setWorkspaces((prev) => [...prev, newWs]);
    setCurrentWorkspaceId(newWs.id);
    return newWs;
  };

  // Active workspace navigation and selection states
  const [selectedAgentId, setSelectedAgentId] = useState('agent-maya');
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  // Modal / Drawer visibility controls
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isBuyNumberOpen, setIsBuyNumberOpen] = useState(false);
  const [buyNumberPreselectedAgent, setBuyNumberPreselectedAgent] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDialerModalOpen, setIsDialerModalOpen] = useState(false);

  // ----------------------------------------------------------------
  // Initial Sync from API Gateway
  // ----------------------------------------------------------------
  const loadWorkspaceData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        fetchedAgents,
        fetchedNumbers,
        fetchedCalls,
        fetchedLeads,
        fetchedCampaigns,
        fetchedWallet,
        fetchedCatalog
      ] = await Promise.all([
        api.agents.list().catch(() => initialAgents),
        api.telephony.getNumbers().catch(() => initialPhoneNumbers),
        api.calls.list().catch(() => initialCalls),
        api.leads.list().catch(() => initialLeads),
        api.campaigns.list().catch(() => initialCampaigns),
        api.billing.getWallet().catch(() => initialWallet),
        api.telephony.getCatalog().catch(() => availableNumbersCatalog)
      ]);

      if (fetchedAgents?.length) setAgents(fetchedAgents);
      if (fetchedNumbers?.length) setPhoneNumbers(fetchedNumbers);
      if (fetchedCalls?.length) setCalls(fetchedCalls);
      if (fetchedLeads?.length) setLeads(fetchedLeads);
      if (fetchedCampaigns?.length) setCampaigns(fetchedCampaigns);
      if (fetchedWallet) setWallet(fetchedWallet);
      if (fetchedCatalog?.length) setAvailableCatalog(fetchedCatalog);
    } catch (err) {
      console.warn('Workspace sync fallback to initial dataset:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkspaceData();
  }, [loadWorkspaceData]);

  // ----------------------------------------------------------------
  // Agent Operations
  // ----------------------------------------------------------------
  const createAgent = async (newAgentData) => {
    try {
      const created = await api.agents.create(newAgentData);
      setAgents((prev) => [created, ...prev]);

      if (newAgentData.numberId) {
        await assignNumberToAgent(newAgentData.numberId, created.id, created.name);
      }
      return created;
    } catch (e) {
      console.warn('API createAgent error, applying local fallback:', e);
      const id = `agent-${Date.now()}`;
      const localAgent = {
        ...newAgentData,
        id,
        status: 'active',
        stats: { totalCalls: 0, totalMinutes: 0, successRate: 100, avgDuration: '0m 00s' },
        updatedAt: new Date().toISOString()
      };
      setAgents((prev) => [localAgent, ...prev]);
      return localAgent;
    }
  };

  const updateAgent = async (agentId, updates) => {
    // Optimistic UI update
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
    );

    try {
      await api.agents.update(agentId, updates);
    } catch (e) {
      console.warn('API updateAgent error:', e);
    }
  };

  const duplicateAgent = async (agentId) => {
    try {
      const cloned = await api.agents.duplicate(agentId);
      setAgents((prev) => [cloned, ...prev]);
      return cloned;
    } catch (e) {
      console.warn('API duplicateAgent error, falling back locally:', e);
      const source = agents.find((a) => a.id === agentId);
      if (!source) return;
      const localClone = {
        ...source,
        id: `agent-${Date.now()}`,
        name: `${source.name} (Copy)`,
        status: 'draft',
        assignedNumber: null,
        numberId: null,
        stats: { totalCalls: 0, totalMinutes: 0, successRate: 100, avgDuration: '0m 00s' },
        updatedAt: new Date().toISOString()
      };
      setAgents((prev) => [localClone, ...prev]);
      return localClone;
    }
  };

  const toggleAgentStatus = async (agentId) => {
    const current = agents.find((a) => a.id === agentId);
    const nextStatus = current?.status === 'active' ? 'paused' : 'active';

    // Optimistic update
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, status: nextStatus, updatedAt: new Date().toISOString() } : a))
    );

    try {
      await api.agents.toggleStatus(agentId, nextStatus);
    } catch (e) {
      console.warn('API toggleAgentStatus error:', e);
    }
  };

  const deleteAgent = async (agentId) => {
    setPhoneNumbers((prev) =>
      prev.map((num) =>
        num.assignedAgentId === agentId
          ? { ...num, assignedAgentId: null, assignedAgentName: 'Unassigned (Pool)', status: 'idle' }
          : num
      )
    );
    setAgents((prev) => prev.filter((a) => a.id !== agentId));

    try {
      await api.agents.delete(agentId);
    } catch (e) {
      console.warn('API deleteAgent error:', e);
    }
  };

  // ----------------------------------------------------------------
  // Virtual Number Operations
  // ----------------------------------------------------------------
  const buyPhoneNumber = async (catalogItem, assignToAgentId = null) => {
    try {
      const provisioned = await api.telephony.buyNumber(catalogItem, assignToAgentId);
      setPhoneNumbers((prev) => [provisioned, ...prev]);
      setAvailableCatalog((prev) => prev.filter((n) => n.formatted !== catalogItem.formatted));

      if (assignToAgentId) {
        updateAgent(assignToAgentId, { assignedNumber: catalogItem.number, numberId: provisioned.id });
      }
      return provisioned;
    } catch (e) {
      console.warn('API buyPhoneNumber error, falling back locally:', e);
      const id = `num-${Date.now()}`;
      const agent = assignToAgentId ? agents.find((a) => a.id === assignToAgentId) : null;
      const localNumber = {
        id,
        number: catalogItem.number,
        formatted: catalogItem.formatted,
        country: catalogItem.country === 'US' ? 'United States' : catalogItem.country,
        countryCode: catalogItem.country,
        type: catalogItem.type,
        areaCode: catalogItem.areaCode,
        locality: catalogItem.locality,
        assignedAgentId: agent ? agent.id : null,
        assignedAgentName: agent ? agent.name : 'Unassigned (Pool)',
        monthlyCost: catalogItem.fee,
        status: 'active',
        capabilities: catalogItem.features || ['Voice'],
        usageMinutesThisMonth: 0,
        inboundRouting: {
          action: agent ? 'ai_agent' : 'voicemail',
          greetingPhrase: agent ? `Connecting you with ${agent.name}...` : 'Please leave a message.',
          businessHours: '08:00 - 18:00 (Local Time)',
          afterHoursAction: 'voicemail',
          recordingEnabled: true
        }
      };
      setPhoneNumbers((prev) => [localNumber, ...prev]);
      setAvailableCatalog((prev) => prev.filter((n) => n.formatted !== catalogItem.formatted));
      if (agent) {
        updateAgent(agent.id, { assignedNumber: catalogItem.number, numberId: id });
      }
      return localNumber;
    }
  };

  const assignNumberToAgent = async (numberId, agentId, agentName = '') => {
    const resolvedAgentName = agentName || (agents.find((a) => a.id === agentId)?.name ?? 'Agent');

    setPhoneNumbers((prev) =>
      prev.map((num) => {
        if (num.id === numberId) {
          return {
            ...num,
            assignedAgentId: agentId,
            assignedAgentName: resolvedAgentName,
            status: 'active',
            inboundRouting: { ...num.inboundRouting, action: 'ai_agent' }
          };
        }
        if (num.assignedAgentId === agentId && num.id !== numberId) {
          return { ...num, assignedAgentId: null, assignedAgentName: 'Unassigned (Pool)', status: 'idle' };
        }
        return num;
      })
    );

    const targetNum = phoneNumbers.find((n) => n.id === numberId);
    if (targetNum) {
      updateAgent(agentId, { assignedNumber: targetNum.number, numberId: targetNum.id });
    }

    try {
      await api.telephony.assignNumber(numberId, agentId);
    } catch (e) {
      console.warn('API assignNumber error:', e);
    }
  };

  const updateNumberRouting = async (numberId, routingUpdates) => {
    setPhoneNumbers((prev) =>
      prev.map((num) =>
        num.id === numberId ? { ...num, inboundRouting: { ...num.inboundRouting, ...routingUpdates } } : num
      )
    );

    try {
      await api.telephony.updateRouting(numberId, routingUpdates);
    } catch (e) {
      console.warn('API updateNumberRouting error:', e);
    }
  };

  const releasePhoneNumber = async (numberId) => {
    const target = phoneNumbers.find((n) => n.id === numberId);
    if (target && target.assignedAgentId) {
      updateAgent(target.assignedAgentId, { assignedNumber: null, numberId: null });
    }
    setPhoneNumbers((prev) => prev.filter((n) => n.id !== numberId));

    try {
      await api.telephony.releaseNumber(numberId);
    } catch (e) {
      console.warn('API releasePhoneNumber error:', e);
    }
  };

  // ----------------------------------------------------------------
  // Lead Pipeline Operations
  // ----------------------------------------------------------------
  const updateLeadStage = async (leadId, newStage) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
    );

    try {
      await api.leads.updateStage(leadId, newStage);
    } catch (e) {
      console.warn('API updateLeadStage error:', e);
    }
  };

  const updateLeadNotes = async (leadId, notes) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, notes } : lead))
    );

    try {
      await api.leads.updateNotes(leadId, notes);
    } catch (e) {
      console.warn('API updateLeadNotes error:', e);
    }
  };

  const triggerCallToLead = async (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    try {
      const initiated = await api.calls.triggerOutbound(lead.phone, lead.agentId || 'agent-david', lead.name);
      setCalls((prev) => [initiated, ...prev]);
      setSelectedCallId(initiated.id);
    } catch (e) {
      console.warn('API triggerCallToLead error, fallback to local simulator:', e);
      const callId = `call-${Date.now()}`;
      const newCall = {
        id: callId,
        callerPhone: lead.phone,
        callerName: lead.name,
        direction: 'Outbound',
        agentId: lead.agentId || 'agent-david',
        agentName: lead.agentName || 'David',
        virtualNumber: '+1 (212) 555-0144',
        durationSeconds: 45,
        formattedDuration: '0m 45s',
        outcome: 'Follow-up Call Connected',
        status: 'Qualified',
        sentiment: 'Positive',
        sentimentScore: 0.85,
        timestamp: 'Just now',
        date: 'Today, Just now',
        cost: '$0.07',
        summary: `Automated follow-up call with ${lead.name} regarding ${lead.intent}. Contact reaffirmed high interest.`,
        transcript: [
          { speaker: lead.agentName || 'David', time: '00:02', text: `Hi ${lead.name}, this is an automated follow-up call regarding ${lead.company}.` },
          { speaker: 'Caller', time: '00:08', text: 'Yes, thank you for checking back in. We are reviewing the proposal today.' }
        ]
      };
      setCalls((prev) => [newCall, ...prev]);
      setSelectedCallId(callId);
    }
  };

  // ----------------------------------------------------------------
  // Campaign Operations
  // ----------------------------------------------------------------
  const createCampaign = async (campaignData) => {
    try {
      const created = await api.campaigns.create(campaignData);
      setCampaigns((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      console.warn('API createCampaign error, falling back locally:', e);
      const id = `camp-${Date.now()}`;
      const agent = agents.find((a) => a.id === campaignData.agentId) || agents[0];
      const localCamp = {
        id,
        name: campaignData.name || 'Outbound Campaign',
        objective: campaignData.objective || 'Lead Qualification',
        agentId: agent.id,
        agentName: agent.name,
        status: 'running',
        assignedNumber: agent.assignedNumber || '+1 (415) 555-0199',
        totalContacts: campaignData.totalContacts || 500,
        completedCalls: 0,
        connectedCalls: 0,
        answerRate: 0.0,
        leadsGenerated: 0,
        costIncurred: '$0.00',
        callingHours: campaignData.callingHours || '09:00 - 18:00 (Local Time)',
        concurrencyLimit: campaignData.concurrencyLimit || 15,
        retryRules: campaignData.retryRules || 'Max 3 retries on busy/unanswered',
        progressPercent: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCampaigns((prev) => [localCamp, ...prev]);
      return localCamp;
    }
  };

  const toggleCampaignStatus = async (campaignId) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status: c.status === 'running' ? 'paused' : 'running' } : c))
    );

    try {
      await api.campaigns.toggleStatus(campaignId);
    } catch (e) {
      console.warn('API toggleCampaignStatus error:', e);
    }
  };

  // ----------------------------------------------------------------
  // Wallet Operations
  // ----------------------------------------------------------------
  const addFunds = async (amountUsd) => {
    try {
      const result = await api.billing.topUp(amountUsd);
      setWallet((prev) => ({
        ...prev,
        usdEquivalent: result.usdEquivalent,
        remainingMinutes: result.remainingMinutes
      }));
    } catch (e) {
      console.warn('API topUp error, falling back locally:', e);
      const addedMinutes = Math.floor(amountUsd / wallet.ratePerMinute);
      setWallet((prev) => ({
        ...prev,
        usdEquivalent: Number((prev.usdEquivalent + amountUsd).toFixed(2)),
        remainingMinutes: prev.remainingMinutes + addedMinutes
      }));
    }
  };

  const toggleAutoRecharge = () => {
    setWallet((prev) => ({
      ...prev,
      autoRechargeEnabled: !prev.autoRechargeEnabled
    }));
  };

  const updateAutoRechargeSettings = (thresholdUsd, amountUsd) => {
    setWallet((prev) => ({
      ...prev,
      autoRechargeThresholdUsd: thresholdUsd,
      autoRechargeAmountUsd: amountUsd
    }));
  };

  const value = {
    // Data
    agents,
    phoneNumbers,
    calls,
    leads,
    campaigns,
    wallet,
    availableCatalog,
    isLoading,
    loadWorkspaceData,

    // Workspaces
    workspaces,
    currentWorkspace,
    switchWorkspace,
    createWorkspace,

    // Selections
    selectedAgentId,
    setSelectedAgentId,
    selectedAgent: agents.find((a) => a.id === selectedAgentId) || agents[0],
    selectedCallId,
    setSelectedCallId,
    selectedCall: calls.find((c) => c.id === selectedCallId) || null,
    selectedLeadId,
    setSelectedLeadId,
    selectedLead: leads.find((l) => l.id === selectedLeadId) || null,

    // Dialog & Flow States
    isCreateAgentOpen,
    setIsCreateAgentOpen,
    isBuyNumberOpen,
    setIsBuyNumberOpen,
    buyNumberPreselectedAgent,
    setBuyNumberPreselectedAgent,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isDialerModalOpen,
    setIsDialerModalOpen,

    // Handlers
    createAgent,
    updateAgent,
    duplicateAgent,
    toggleAgentStatus,
    deleteAgent,
    buyPhoneNumber,
    assignNumberToAgent,
    updateNumberRouting,
    releasePhoneNumber,
    updateLeadStage,
    updateLeadNotes,
    triggerCallToLead,
    createCampaign,
    toggleCampaignStatus,
    addFunds,
    toggleAutoRecharge,
    updateAutoRechargeSettings
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
