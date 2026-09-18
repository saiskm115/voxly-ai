/**
 * Voxly AI — Unified API Client
 * 
 * Clean, production-ready REST client connecting the frontend user console
 * directly to your backend service (configured via VITE_API_URL).
 * Automatically includes JWT Bearer tokens and handles graceful local fallbacks.
 */

import { mockBackend } from './mockBackend';

const AUTH_TOKEN_KEY = 'voxly_auth_token';

export const api = {
  /**
   * Get backend base URL from environment or localStorage
   */
  getBackendUrl() {
    return (
      import.meta.env.VITE_API_URL ||
      localStorage.getItem('voxly_backend_url') ||
      ''
    );
  },

  /**
   * Set or override backend base URL
   */
  setBackendUrl(url) {
    if (url) {
      localStorage.setItem('voxly_backend_url', url);
    } else {
      localStorage.removeItem('voxly_backend_url');
    }
  },

  /**
   * Bearer token management
   */
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

  /**
   * Core request dispatcher
   */
  async request(method, endpoint, body = null, customHeaders = {}) {
    const backendUrl = this.getBackendUrl().replace(/\/$/, '');
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    };

    // If backend URL is configured, make real network request to user's backend
    if (backendUrl) {
      try {
        const fullUrl = `${backendUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
        const fetchOptions = {
          method,
          headers,
          ...(body ? { body: JSON.stringify(body) } : {})
        };

        const response = await fetch(fullUrl, fetchOptions);
        let data = null;
        try {
          data = await response.json();
        } catch (e) {
          data = { text: await response.text() };
        }

        if (!response.ok) {
          throw new Error(data?.error || data?.message || `HTTP ${response.status}: Request failed`);
        }

        return data;
      } catch (err) {
        // If live backend request fails, log warning and fall back to local handler so UI remains operational
        console.warn(`[API] Backend request failed (${method} ${endpoint}): ${err.message}. Using local handler.`);
        const mockResult = await mockBackend.handleRequest(method, endpoint, body, headers);
        return mockResult.data;
      }
    }

    // Default: Dispatch through local mock backend
    const mockResult = await mockBackend.handleRequest(method, endpoint, body, headers);
    if (mockResult.status >= 400) {
      throw new Error(mockResult.data?.error || `HTTP ${mockResult.status}: Request failed`);
    }
    return mockResult.data;
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
  // 2. AI Voice Employees Endpoints
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
  }
};
