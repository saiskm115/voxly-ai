/**
 * Voxly AI — Unified API Gateway Client
 * 
 * Provides seamless, typed communication for:
 * 1. Live Production Backend (FastAPI, Express, NestJS, Go, etc.)
 * 2. Instant Local Mock / Simulator Engine (works completely standalone)
 * 3. Real-time Request/Response audit logging for the Admin Dev Panel
 */

import { mockBackend } from './mockBackend';
import { openApiSpec } from './apiContract';

const BACKEND_URL_KEY = 'voxly_backend_url';
const BACKEND_MODE_KEY = 'voxly_backend_mode'; // 'mock' | 'live'
const AUTH_TOKEN_KEY = 'voxly_auth_token';

// In-memory log buffer for Dev Panel
let apiLogs = [];
const logSubscribers = new Set();

function notifySubscribers() {
  const currentLogs = [...apiLogs];
  logSubscribers.forEach((fn) => {
    try {
      fn(currentLogs);
    } catch (err) {
      console.warn('API log subscriber error:', err);
    }
  });
}

function addLogEntry(entry) {
  apiLogs = [entry, ...apiLogs].slice(0, 150); // keep last 150 logs
  notifySubscribers();
}

export const api = {
  // ---------------------------------------------------------------------------
  // Infrastructure & Configuration Management
  // ---------------------------------------------------------------------------
  getBackendUrl() {
    return (
      localStorage.getItem(BACKEND_URL_KEY) ||
      import.meta.env.VITE_API_URL ||
      'http://localhost:8000/api'
    );
  },

  setBackendUrl(url) {
    localStorage.setItem(BACKEND_URL_KEY, url);
  },

  getMode() {
    return localStorage.getItem(BACKEND_MODE_KEY) || 'mock';
  },

  setMode(mode) {
    localStorage.setItem(BACKEND_MODE_KEY, mode);
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null;
  },

  setToken(token) {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  },

  clearToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  subscribeLogs(callback) {
    logSubscribers.add(callback);
    callback([...apiLogs]);
    return () => logSubscribers.delete(callback);
  },

  getLogs() {
    return [...apiLogs];
  },

  clearLogs() {
    apiLogs = [];
    notifySubscribers();
  },

  async pingBackend(targetUrl = null) {
    const url = targetUrl || this.getBackendUrl();
    const startTime = performance.now();
    try {
      const response = await fetch(`${url.replace(/\/$/, '')}/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });
      const latencyMs = Math.round(performance.now() - startTime);
      return {
        online: response.ok,
        status: response.status,
        statusText: response.statusText,
        latencyMs
      };
    } catch (err) {
      const latencyMs = Math.round(performance.now() - startTime);
      return {
        online: false,
        status: 0,
        statusText: err.message || 'Network unreachable',
        latencyMs
      };
    }
  },

  // ---------------------------------------------------------------------------
  // Core Dispatcher
  // ---------------------------------------------------------------------------
  async request(method, endpoint, body = null, customHeaders = {}) {
    const mode = this.getMode();
    const startTime = performance.now();
    const logId = 'req_' + Math.random().toString(36).substring(2, 9);
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    };

    let responseStatus = 200;
    let responseData = null;
    let errorOccurred = null;

    try {
      if (mode === 'live') {
        const baseUrl = this.getBackendUrl().replace(/\/$/, '');
        const fullUrl = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

        const fetchOptions = {
          method,
          headers,
          ...(body ? { body: JSON.stringify(body) } : {})
        };

        const response = await fetch(fullUrl, fetchOptions);
        responseStatus = response.status;
        try {
          responseData = await response.json();
        } catch (e) {
          responseData = { text: await response.text() };
        }

        if (!response.ok) {
          throw new Error(responseData?.error || responseData?.message || `HTTP ${responseStatus}: Request failed`);
        }
      } else {
        // Run through local mock server engine
        const mockResult = await mockBackend.handleRequest(method, endpoint, body, headers);
        responseStatus = mockResult.status;
        responseData = mockResult.data;

        if (responseStatus >= 400) {
          throw new Error(responseData?.error || `HTTP ${responseStatus}: Request failed`);
        }
      }

      return responseData;
    } catch (err) {
      errorOccurred = err.message;
      if (mode === 'live') {
        console.warn(`[Voxly API Live Mode Error] ${method} ${endpoint}:`, err);
      }
      throw err;
    } finally {
      const durationMs = Math.round(performance.now() - startTime);
      addLogEntry({
        id: logId,
        timestamp: new Date().toLocaleTimeString(),
        method,
        endpoint,
        mode,
        status: responseStatus,
        durationMs,
        requestBody: body,
        responseData,
        error: errorOccurred
      });
    }
  },

  // ---------------------------------------------------------------------------
  // 1. Auth & Session Endpoints
  // ---------------------------------------------------------------------------
  auth: {
    async login(email, password) {
      const data = await api.request('POST', '/api/auth/login', { email, password });
      if (data?.token) api.setToken(data.token);
      return data;
    },

    async signup(name, email, password) {
      const data = await api.request('POST', '/api/auth/signup', { name, email, password });
      if (data?.token) api.setToken(data.token);
      return data;
    },

    async googleLogin(idToken = null, profile = {}) {
      const data = await api.request('POST', '/api/auth/google', { idToken, ...profile });
      if (data?.token) api.setToken(data.token);
      return data;
    },

    async githubLogin(code = null) {
      const data = await api.request('POST', '/api/auth/github', { code });
      if (data?.token) api.setToken(data.token);
      return data;
    },

    async magicLink(email) {
      return await api.request('POST', '/api/auth/magic-link', { email });
    },

    async ssoLogin(domain) {
      const data = await api.request('POST', '/api/auth/sso', { domain });
      if (data?.token) api.setToken(data.token);
      return data;
    },

    async getSession() {
      return await api.request('GET', '/api/auth/session');
    },

    async getMe() {
      return await api.request('GET', '/api/auth/me');
    },

    async logout() {
      try {
        await api.request('POST', '/api/auth/logout');
      } finally {
        api.clearToken();
      }
      return { success: true };
    }
  },

  // ---------------------------------------------------------------------------
  // 2. AI Voice Agents Endpoints
  // ---------------------------------------------------------------------------
  agents: {
    async list() {
      return await api.request('GET', '/api/agents');
    },

    async get(id) {
      return await api.request('GET', `/api/agents/${id}`);
    },

    async create(agentData) {
      return await api.request('POST', '/api/agents', agentData);
    },

    async update(id, updates) {
      return await api.request('PUT', `/api/agents/${id}`, updates);
    },

    async duplicate(id) {
      return await api.request('POST', `/api/agents/${id}/duplicate`);
    },

    async toggleStatus(id, status = null) {
      return await api.request('PATCH', `/api/agents/${id}/status`, { status });
    },

    async delete(id) {
      return await api.request('DELETE', `/api/agents/${id}`);
    }
  },

  // ---------------------------------------------------------------------------
  // 3. Telephony & Virtual Numbers Endpoints
  // ---------------------------------------------------------------------------
  telephony: {
    async getNumbers() {
      return await api.request('GET', '/api/telephony/numbers');
    },

    async getCatalog() {
      return await api.request('GET', '/api/telephony/catalog');
    },

    async buyNumber(catalogItem, assignToAgentId = null) {
      return await api.request('POST', '/api/telephony/buy', { catalogItem, assignToAgentId });
    },

    async assignNumber(numberId, agentId) {
      return await api.request('POST', `/api/telephony/numbers/${numberId}/assign`, { agentId });
    },

    async updateRouting(numberId, routingConfig) {
      return await api.request('PUT', `/api/telephony/numbers/${numberId}/routing`, routingConfig);
    },

    async releaseNumber(numberId) {
      return await api.request('DELETE', `/api/telephony/numbers/${numberId}`);
    }
  },

  // ---------------------------------------------------------------------------
  // 4. Calls & Transcripts Endpoints
  // ---------------------------------------------------------------------------
  calls: {
    async list() {
      return await api.request('GET', '/api/calls');
    },

    async get(id) {
      return await api.request('GET', `/api/calls/${id}`);
    },

    async triggerOutbound(targetPhone, agentId, callerName = null) {
      return await api.request('POST', '/api/calls/outbound', { targetPhone, agentId, callerName });
    }
  },

  // ---------------------------------------------------------------------------
  // 5. Leads & CRM Endpoints
  // ---------------------------------------------------------------------------
  leads: {
    async list() {
      return await api.request('GET', '/api/leads');
    },

    async create(leadData) {
      return await api.request('POST', '/api/leads', leadData);
    },

    async updateStage(leadId, stage) {
      return await api.request('PATCH', `/api/leads/${leadId}/stage`, { stage });
    },

    async updateNotes(leadId, notes) {
      return await api.request('PATCH', `/api/leads/${leadId}/notes`, { notes });
    }
  },

  // ---------------------------------------------------------------------------
  // 6. Campaigns Endpoints
  // ---------------------------------------------------------------------------
  campaigns: {
    async list() {
      return await api.request('GET', '/api/campaigns');
    },

    async create(campaignData) {
      return await api.request('POST', '/api/campaigns', campaignData);
    },

    async toggleStatus(id) {
      return await api.request('PATCH', `/api/campaigns/${id}/status`);
    }
  },

  // ---------------------------------------------------------------------------
  // 7. Billing & Wallet Endpoints
  // ---------------------------------------------------------------------------
  billing: {
    async getWallet() {
      return await api.request('GET', '/api/billing/wallet');
    },

    async topUp(amountUsd) {
      return await api.request('POST', '/api/billing/topup', { amountUsd });
    }
  },

  // ---------------------------------------------------------------------------
  // 8. Admin & Dev Health Endpoints
  // ---------------------------------------------------------------------------
  admin: {
    async getMetrics() {
      return await api.request('GET', '/api/admin/metrics');
    },

    resetDatabase() {
      return mockBackend.resetDatabase();
    },

    getOpenApiSpec() {
      return openApiSpec;
    }
  }
};
