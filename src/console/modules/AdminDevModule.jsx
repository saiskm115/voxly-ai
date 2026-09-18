import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Server,
  Key,
  Database,
  Activity,
  Send,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Code2,
  ShieldCheck,
  FileCode2,
  Lock,
  ArrowRight,
  Radio,
  Cpu,
  PhoneCall
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { TactileButton } from '../ui/TactileButton';
import { StatusBadge } from '../ui/StatusBadge';
import { api } from '../../services/api';
import { useWorkspace } from '../context/WorkspaceContext';

const PRESET_ENDPOINTS = [
  {
    id: 'get_agents',
    name: 'List AI Voice Employees',
    method: 'GET',
    path: '/api/agents',
    body: null
  },
  {
    id: 'create_agent',
    name: 'Create AI Voice Employee',
    method: 'POST',
    path: '/api/agents',
    body: {
      name: 'Elena Rostova',
      role: 'VIP Lead Qualifier',
      department: 'Enterprise Sales',
      description: 'Senior outbound representative handling executive inquiries.',
      language: 'English (US & UK)',
      greeting: 'Good morning, this is Elena from Executive Client Relations.',
      script: 'You are an executive voice assistant. Qualify client budget and timeline.',
      transferNumber: '+1 (415) 555-0100',
      concurrencyLimit: 15
    }
  },
  {
    id: 'get_numbers',
    name: 'List Purchased Virtual DIDs',
    method: 'GET',
    path: '/api/telephony/numbers',
    body: null
  },
  {
    id: 'get_catalog',
    name: 'Get Available Phone Catalog',
    method: 'GET',
    path: '/api/telephony/catalog',
    body: null
  },
  {
    id: 'get_calls',
    name: 'Get Call Logs & Transcripts',
    method: 'GET',
    path: '/api/calls',
    body: null
  },
  {
    id: 'outbound_call',
    name: 'Initiate Outbound Call',
    method: 'POST',
    path: '/api/calls/outbound',
    body: {
      targetPhone: '+1 (555) 019-2834',
      callerName: 'Dev Testing Client',
      agentId: 'agent-maya'
    }
  },
  {
    id: 'get_leads',
    name: 'Fetch CRM Leads Pipeline',
    method: 'GET',
    path: '/api/leads',
    body: null
  },
  {
    id: 'get_campaigns',
    name: 'List Outbound Bulk Campaigns',
    method: 'GET',
    path: '/api/campaigns',
    body: null
  },
  {
    id: 'get_wallet',
    name: 'Get Talk-Time Wallet Balance',
    method: 'GET',
    path: '/api/billing/wallet',
    body: null
  },
  {
    id: 'topup_wallet',
    name: 'Top-Up Minutes Wallet',
    method: 'POST',
    path: '/api/billing/topup',
    body: {
      amountUsd: 50
    }
  },
  {
    id: 'auth_session',
    name: 'Inspect Current Auth Session',
    method: 'GET',
    path: '/api/auth/session',
    body: null
  },
  {
    id: 'auth_login',
    name: 'Authenticate User (Login)',
    method: 'POST',
    path: '/api/auth/login',
    body: {
      email: 'admin@voxly.ai',
      password: 'password123'
    }
  },
  {
    id: 'admin_metrics',
    name: 'Get System & PSTN Health Metrics',
    method: 'GET',
    path: '/api/admin/metrics',
    body: null
  }
];

export function AdminDevModule() {
  const { loadWorkspaceData } = useWorkspace();

  // Mode & Connection state
  const [backendMode, setBackendMode] = useState(api.getMode());
  const [backendUrl, setBackendUrl] = useState(api.getBackendUrl());
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  // Auth & Token state
  const [currentToken, setCurrentToken] = useState(api.getToken() || '');
  const [customTokenInput, setCustomTokenInput] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Active Tab inside Dev Panel: 'tester' | 'infrastructure' | 'logs' | 'docs'
  const [activeDevTab, setActiveDevTab] = useState('tester');

  // Interactive Endpoint Tester state
  const [selectedEndpoint, setSelectedEndpoint] = useState(PRESET_ENDPOINTS[0]);
  const [customPath, setCustomPath] = useState(PRESET_ENDPOINTS[0].path);
  const [customMethod, setCustomMethod] = useState(PRESET_ENDPOINTS[0].method);
  const [requestBodyInput, setRequestBodyInput] = useState(
    PRESET_ENDPOINTS[0].body ? JSON.stringify(PRESET_ENDPOINTS[0].body, null, 2) : ''
  );
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [responseResult, setResponseResult] = useState(null);

  // Real-time Logs state
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  // System telemetry metrics
  const [telemetry, setTelemetry] = useState(null);

  // Subscribe to live API logs
  useEffect(() => {
    const unsubscribe = api.subscribeLogs((newLogs) => {
      setLogs(newLogs);
    });
    return unsubscribe;
  }, []);

  // Fetch telemetry on load
  useEffect(() => {
    api.admin.getMetrics().then((data) => setTelemetry(data)).catch(() => {});
  }, []);

  // Decode JWT whenever token changes
  useEffect(() => {
    if (!currentToken) {
      setDecodedToken(null);
      return;
    }
    try {
      const parts = currentToken.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        setDecodedToken(payload);
      } else {
        setDecodedToken({ rawToken: currentToken });
      }
    } catch (e) {
      setDecodedToken({ note: 'Non-standard JWT format or opaque token', rawToken: currentToken });
    }
  }, [currentToken]);

  const handleModeChange = (newMode) => {
    setBackendMode(newMode);
    api.setMode(newMode);
  };

  const handleSaveBackendUrl = () => {
    api.setBackendUrl(backendUrl);
    handlePing();
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await api.pingBackend(backendUrl);
      setPingResult(res);
    } finally {
      setIsPinging(false);
    }
  };

  const handleSelectPreset = (ep) => {
    setSelectedEndpoint(ep);
    setCustomPath(ep.path);
    setCustomMethod(ep.method);
    setRequestBodyInput(ep.body ? JSON.stringify(ep.body, null, 2) : '');
    setResponseResult(null);
  };

  const handleExecuteRequest = async () => {
    setIsSendingRequest(true);
    setResponseResult(null);
    const startTime = performance.now();

    try {
      let parsedBody = null;
      if (['POST', 'PUT', 'PATCH'].includes(customMethod) && requestBodyInput.trim()) {
        try {
          parsedBody = JSON.parse(requestBodyInput);
        } catch (e) {
          throw new Error('Invalid JSON in request body: ' + e.message);
        }
      }

      const data = await api.request(customMethod, customPath, parsedBody);
      const latencyMs = Math.round(performance.now() - startTime);

      setResponseResult({
        success: true,
        status: 200,
        statusText: 'OK',
        latencyMs,
        data
      });

      // Refresh workspace context if mutating
      if (loadWorkspaceData && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(customMethod)) {
        loadWorkspaceData().catch(() => {});
      }
    } catch (err) {
      const latencyMs = Math.round(performance.now() - startTime);
      setResponseResult({
        success: false,
        status: 400,
        statusText: 'Error',
        latencyMs,
        error: err.message
      });
    } finally {
      setIsSendingRequest(false);
    }
  };

  const handleInjectToken = () => {
    if (!customTokenInput.trim()) return;
    api.setToken(customTokenInput.trim());
    setCurrentToken(customTokenInput.trim());
    setCustomTokenInput('');
  };

  const handleClearSession = () => {
    api.clearToken();
    setCurrentToken('');
    setDecodedToken(null);
  };

  const handleImpersonateAdmin = async () => {
    const res = await api.auth.login('admin@voxly.ai', 'admin-token');
    if (res?.token) {
      setCurrentToken(res.token);
    }
  };

  const handleResetDb = () => {
    if (confirm('Reset mock database to initial seed data? This resets all agents, calls, leads, and numbers.')) {
      api.admin.resetDatabase();
      if (loadWorkspaceData) loadWorkspaceData();
      alert('Mock database reset to factory seed values.');
    }
  };

  const getMethodBadgeClass = (method) => {
    switch (method) {
      case 'GET':
        return 'bg-[#EBF5FF] text-[#1D4ED8] border-[#BFDBFE]';
      case 'POST':
        return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]';
      case 'PUT':
      case 'PATCH':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'DELETE':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
      default:
        return 'bg-[#F0EEF6] text-[#524E5E] border-[#E4E2EB]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Fast Mode Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E4E2EB] shadow-craft-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0F0E17] text-white flex items-center justify-center shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F0E17] tracking-tight flex items-center gap-2">
                <span>Admin & Developer Infrastructure</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                  backendMode === 'live'
                    ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                    : 'bg-[#F0EEF6] text-[#524E5E] border-[#E4E2EB]'
                }`}>
                  {backendMode === 'live' ? 'Live Backend Connected' : 'Mock Simulator Mode'}
                </span>
              </h2>
              <p className="text-xs text-[#524E5E] mt-0.5">
                Connect your FastAPI / Express / Go backend, test REST endpoints, inspect JWT auth sessions, and audit live telephony logs.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Toggle Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-[#FAF9FD] border border-[#E4E2EB]">
            <button
              type="button"
              onClick={() => handleModeChange('mock')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                backendMode === 'mock'
                  ? 'bg-white text-[#0F0E17] shadow-xs'
                  : 'text-[#524E5E] hover:text-[#0F0E17]'
              }`}
            >
              Local Mock Engine
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                backendMode === 'live'
                  ? 'bg-[#0F0E17] text-white shadow-xs'
                  : 'text-[#524E5E] hover:text-[#0F0E17]'
              }`}
            >
              Live Production Backend
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetDb}
            title="Reset Local Mock Database"
            className="p-2 rounded-xl text-[#524E5E] hover:text-[#DC2626] hover:bg-[#FEF2F2] border border-[#E4E2EB] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Backend URL & Gateway Configuration Card */}
      <SolidCard className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#6344E7]" />
            <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
              Backend Gateway Endpoint & Health
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {pingResult && (
              <span className={`text-xs font-mono font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                pingResult.online
                  ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                  : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
              }`}>
                {pingResult.online ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{pingResult.online ? `HTTP ${pingResult.status} (${pingResult.latencyMs}ms)` : `Unreachable: ${pingResult.statusText}`}</span>
              </span>
            )}

            <TactileButton
              variant="secondary"
              size="sm"
              icon={Activity}
              onClick={handlePing}
              disabled={isPinging}
            >
              {isPinging ? 'Pinging...' : 'Ping Gateway'}
            </TactileButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="sm:col-span-3">
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              placeholder="e.g. http://localhost:8000/api or https://api.voxly.ai/v1"
              className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-3 py-2 text-xs font-mono text-[#0F0E17] focus:outline-none focus:border-[#6344E7]"
            />
          </div>
          <div>
            <TactileButton
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={handleSaveBackendUrl}
            >
              Save Backend URL
            </TactileButton>
          </div>
        </div>
      </SolidCard>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E2EB] pb-2">
        {[
          { id: 'tester', label: 'API Endpoint Tester', icon: Send },
          { id: 'auth', label: 'Auth & JWT Sessions', icon: Key },
          { id: 'infrastructure', label: 'Telephony & LLM Health', icon: Cpu },
          { id: 'logs', label: `Live Network Logs (${logs.length})`, icon: Activity },
          { id: 'docs', label: 'OpenAPI 3.0 Contracts', icon: Code2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDevTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDevTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0F0E17] text-white shadow-xs'
                  : 'text-[#524E5E] hover:text-[#0F0E17] hover:bg-[#FAF9FD]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* 1. API ENDPOINT TESTER TAB */}
      {/* ===================================================================== */}
      {activeDevTab === 'tester' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Preset Endpoints Picker */}
          <SolidCard className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E2EB]">
              <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
                Preset Endpoints
              </h3>
              <span className="text-[10px] font-mono text-[#524E5E]">{PRESET_ENDPOINTS.length} ready</span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {PRESET_ENDPOINTS.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => handleSelectPreset(ep)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-[#FAF9FD] border-[#6344E7] shadow-xs font-semibold'
                        : 'bg-white border-[#E4E2EB] hover:border-[#D1CFDB] text-[#524E5E]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-[#0F0E17] truncate">{ep.name}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getMethodBadgeClass(ep.method)}`}>
                        {ep.method}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#8C879A] truncate">{ep.path}</div>
                  </button>
                );
              })}
            </div>
          </SolidCard>

          {/* Right 2 Columns: Request Builder & Live Response Box */}
          <div className="lg:col-span-2 space-y-4">
            <SolidCard className="space-y-4">
              {/* Method & Path Row */}
              <div className="flex items-center gap-2">
                <select
                  value={customMethod}
                  onChange={(e) => setCustomMethod(e.target.value)}
                  className="bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-3 py-2 text-xs font-bold text-[#0F0E17] focus:outline-none focus:border-[#6344E7]"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>

                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="/api/..."
                  className="flex-1 bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-3 py-2 text-xs font-mono text-[#0F0E17] focus:outline-none focus:border-[#6344E7]"
                />

                <TactileButton
                  variant="primary"
                  size="md"
                  icon={Send}
                  onClick={handleExecuteRequest}
                  disabled={isSendingRequest}
                >
                  {isSendingRequest ? 'Sending...' : 'Send Request'}
                </TactileButton>
              </div>

              {/* Request Body JSON Area (if applicable) */}
              {['POST', 'PUT', 'PATCH'].includes(customMethod) && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#524E5E] uppercase tracking-wider">
                      Request Body (JSON)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const formatted = JSON.stringify(JSON.parse(requestBodyInput), null, 2);
                          setRequestBodyInput(formatted);
                        } catch (e) {}
                      }}
                      className="text-[10px] text-[#6344E7] hover:underline"
                    >
                      Format JSON
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={requestBodyInput}
                    onChange={(e) => setRequestBodyInput(e.target.value)}
                    placeholder="Enter JSON request payload..."
                    className="w-full bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl p-3 text-xs font-mono text-[#0F0E17] focus:outline-none focus:border-[#6344E7]"
                  />
                </div>
              )}
            </SolidCard>

            {/* Live Response Box */}
            <SolidCard className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E2EB]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
                    Server Response
                  </h3>
                  {responseResult && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      responseResult.success
                        ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                    }`}>
                      HTTP {responseResult.status} • {responseResult.latencyMs}ms
                    </span>
                  )}
                </div>

                {responseResult && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(responseResult.data || responseResult.error, null, 2));
                      alert('Copied response to clipboard');
                    }}
                    className="text-xs text-[#6344E7] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </button>
                )}
              </div>

              {responseResult ? (
                <div className="p-3.5 rounded-xl bg-[#0F0E17] text-white font-mono text-xs max-h-96 overflow-y-auto leading-relaxed select-text">
                  <pre>{JSON.stringify(responseResult.data || responseResult.error, null, 2)}</pre>
                </div>
              ) : (
                <div className="py-12 text-center text-[#8C879A] text-xs">
                  Click <strong>Send Request</strong> above to dispatch and inspect the live API response.
                </div>
              )}
            </SolidCard>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. AUTH & JWT SESSIONS TAB */}
      {/* ===================================================================== */}
      {activeDevTab === 'auth' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SolidCard className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E2EB]">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#6344E7]" />
                <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
                  Active Bearer Token
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <TactileButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(currentToken);
                    setTokenCopied(true);
                    setTimeout(() => setTokenCopied(false), 2000);
                  }}
                  disabled={!currentToken}
                >
                  {tokenCopied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{tokenCopied ? 'Copied' : 'Copy'}</span>
                </TactileButton>

                <TactileButton
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSession}
                  className="text-[#DC2626] hover:bg-[#FEF2F2]"
                >
                  Clear Session
                </TactileButton>
              </div>
            </div>

            <div className="p-3 bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl font-mono text-xs text-[#0F0E17] break-all select-all">
              {currentToken ? currentToken : <span className="text-[#8C879A] italic">No active Bearer token found. Authenticate below or inject one.</span>}
            </div>

            {/* Quick Session Impersonation */}
            <div className="pt-2 border-t border-[#E4E2EB] flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#524E5E] font-medium">Quick Auth:</span>
              <button
                type="button"
                onClick={handleImpersonateAdmin}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F0EEF6] hover:bg-[#E4E2EB] text-[#0F0E17] transition-all"
              >
                Log in as Fleet Admin
              </button>
            </div>
          </SolidCard>

          {/* Decoded Token Claims Inspector */}
          <SolidCard className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider pb-2 border-b border-[#E4E2EB]">
              Decoded Token Claims
            </h3>

            {decodedToken ? (
              <div className="space-y-2 text-xs font-mono">
                {Object.entries(decodedToken).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9FD] border border-[#E4E2EB]">
                    <span className="text-[#524E5E] font-bold">{key}</span>
                    <span className="text-[#0F0E17] font-semibold truncate max-w-xs">{String(val)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#8C879A]">
                No decoded claims available.
              </div>
            )}

            {/* Custom Token Injector */}
            <div className="pt-3 border-t border-[#E4E2EB] space-y-2">
              <label className="block text-xs font-semibold text-[#0F0E17]">
                Inject External Custom JWT Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customTokenInput}
                  onChange={(e) => setCustomTokenInput(e.target.value)}
                  placeholder="Paste backend JWT Bearer token here..."
                  className="flex-1 bg-[#FAF9FD] border border-[#E4E2EB] rounded-xl px-3 py-2 text-xs font-mono text-[#0F0E17] focus:outline-none focus:border-[#6344E7]"
                />
                <TactileButton variant="primary" size="sm" onClick={handleInjectToken}>
                  Inject
                </TactileButton>
              </div>
            </div>
          </SolidCard>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. TELEPHONY & LLM HEALTH TAB */}
      {/* ===================================================================== */}
      {activeDevTab === 'infrastructure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SolidCard className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C879A] uppercase">PSTN SIP Trunk</span>
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>
            <div className="text-base font-bold text-[#0F0E17]">Telnyx / Twilio SIP</div>
            <div className="text-xs font-mono text-[#524E5E]">Round-trip: 18ms • Channels: 4 Active</div>
          </SolidCard>

          <SolidCard className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C879A] uppercase">Speech-to-Text</span>
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>
            <div className="text-base font-bold text-[#0F0E17]">Deepgram Nova-2</div>
            <div className="text-xs font-mono text-[#524E5E]">Audio Latency: 110ms • STT Stream: OK</div>
          </SolidCard>

          <SolidCard className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C879A] uppercase">LLM Engine</span>
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>
            <div className="text-base font-bold text-[#0F0E17]">DeepSeek / Claude 3.5</div>
            <div className="text-xs font-mono text-[#524E5E]">TTFT: 280ms • Prompt Cache: Active</div>
          </SolidCard>

          <SolidCard className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C879A] uppercase">Voice Synthesizer</span>
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            </div>
            <div className="text-base font-bold text-[#0F0E17]">Cartesia Sonic</div>
            <div className="text-xs font-mono text-[#524E5E]">Synthesis: 85ms • Codec: PCM 24kHz</div>
          </SolidCard>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. LIVE NETWORK AUDIT LOGS TAB */}
      {/* ===================================================================== */}
      {activeDevTab === 'logs' && (
        <SolidCard className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4E2EB]">
            <div>
              <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
                Real-Time API Traffic Logs ({logs.length})
              </h3>
              <p className="text-[11px] text-[#524E5E]">Audit stream of all requests dispatched by the user console.</p>
            </div>

            <TactileButton variant="secondary" size="sm" onClick={() => api.clearLogs()}>
              Clear Audit Logs
            </TactileButton>
          </div>

          <div className="divide-y divide-[#E4E2EB] max-h-[500px] overflow-y-auto">
            {logs.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8C879A]">
                No API logs recorded yet. Navigate the console or dispatch a request in the tester.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                  className="py-2.5 px-2 hover:bg-[#FAF9FD] rounded-lg transition-colors cursor-pointer text-xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${getMethodBadgeClass(log.method)}`}>
                        {log.method}
                      </span>
                      <span className="font-mono text-[#0F0E17] font-semibold truncate">{log.endpoint}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                      <span className={`font-bold ${log.status < 400 ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                        {log.status}
                      </span>
                      <span className="text-[#8C879A]">{log.durationMs}ms</span>
                      <span className="text-[#8C879A]">{log.timestamp}</span>
                    </div>
                  </div>

                  {/* Expanded Request/Response Payload Inspector */}
                  {selectedLog?.id === log.id && (
                    <div className="mt-3 p-3 rounded-xl bg-[#0F0E17] text-white font-mono text-[11px] space-y-2 select-text">
                      {log.requestBody && (
                        <div>
                          <div className="text-[#8C879A] font-bold text-[10px] uppercase">Request Body:</div>
                          <pre className="text-[#A7F3D0]">{JSON.stringify(log.requestBody, null, 2)}</pre>
                        </div>
                      )}
                      <div>
                        <div className="text-[#8C879A] font-bold text-[10px] uppercase">Response Body:</div>
                        <pre className="text-[#BFDBFE]">{JSON.stringify(log.responseData || log.error, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </SolidCard>
      )}

      {/* ===================================================================== */}
      {/* 5. OPENAPI 3.0 CONTRACTS TAB */}
      {/* ===================================================================== */}
      {activeDevTab === 'docs' && (
        <SolidCard className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4E2EB]">
            <div>
              <h3 className="text-xs font-bold text-[#0F0E17] uppercase tracking-wider">
                OpenAPI 3.0 API Specification
              </h3>
              <p className="text-[11px] text-[#524E5E]">Import this specification into Swagger UI, Postman, or generate your backend DTOs.</p>
            </div>

            <TactileButton
              variant="primary"
              size="sm"
              icon={Copy}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(api.admin.getOpenApiSpec(), null, 2));
                alert('Copied OpenAPI 3.0 Specification JSON to clipboard');
              }}
            >
              Copy OpenAPI JSON
            </TactileButton>
          </div>

          <div className="p-4 bg-[#0F0E17] text-[#BFDBFE] font-mono text-xs rounded-xl max-h-[500px] overflow-y-auto leading-relaxed select-text">
            <pre>{JSON.stringify(api.admin.getOpenApiSpec(), null, 2)}</pre>
          </div>
        </SolidCard>
      )}
    </div>
  );
}
