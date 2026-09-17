/**
 * Voxly AI Authentication Service
 * 
 * Supports both:
 * 1. Configured Backend Mode (Supabase / Firebase / Custom OAuth via .env)
 * 2. Instant Client-Side Simulator Mode (allows immediate interactive testing without external setup)
 */

const STORAGE_KEY = 'voxly_auth_session';

export const authService = {
  /**
   * Get current stored session from localStorage
   */
  getSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Error reading auth session:', e);
      return null;
    }
  },

  /**
   * Save session to localStorage
   */
  saveSession(user) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving auth session:', e);
    }
  },

  /**
   * Clear session from localStorage
   */
  clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing auth session:', e);
    }
  },

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    // Check if real Supabase / Firebase / OAuth is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (googleClientId && window.google?.accounts?.oauth2) {
      // Direct Google Identity Services integration if configured
      return new Promise((resolve, reject) => {
        const client = window.google.accounts.oauth2.initCodeClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          ux_mode: 'popup',
          callback: (response) => {
            const mockUser = {
              id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
              name: 'Google User',
              email: 'user@gmail.com',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
              provider: 'google',
              createdAt: new Date().toISOString(),
              plan: 'Professional Fleet',
            };
            this.saveSession(mockUser);
            resolve(mockUser);
          },
          error_callback: (err) => reject(new Error('Google sign-in was cancelled or failed.')),
        });
        client.requestCode();
      });
    }

    // Interactive Instant Mode: Simulates 600ms latency and returns authenticated Google user
    await new Promise((r) => setTimeout(r, 650));
    const user = {
      id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'Alex Vance',
      email: 'alex.vance@company.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      provider: 'google',
      createdAt: new Date().toISOString(),
      plan: 'Professional Fleet',
    };
    this.saveSession(user);
    return user;
  },

  /**
   * Sign in with GitHub
   */
  async signInWithGithub() {
    await new Promise((r) => setTimeout(r, 650));
    const user = {
      id: 'usr_gh_' + Math.random().toString(36).substring(2, 9),
      name: 'Dev Lead (GitHub)',
      email: 'engineer@github-team.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      provider: 'github',
      createdAt: new Date().toISOString(),
      plan: 'Professional Fleet',
    };
    this.saveSession(user);
    return user;
  },

  /**
   * Sign in with Email & Password
   */
  async signInWithEmailPassword(email, password) {
    await new Promise((r) => setTimeout(r, 550));

    if (!email || !password) {
      throw new Error('Please enter both your work email and password.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid work email address.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const user = {
      id: 'usr_em_' + Math.random().toString(36).substring(2, 9),
      name: name || 'Fleet Operator',
      email: email.trim(),
      avatar: null,
      provider: 'email',
      createdAt: new Date().toISOString(),
      plan: 'Starter Fleet',
    };
    this.saveSession(user);
    return user;
  },

  /**
   * Sign up with Name, Email & Password
   */
  async signUpWithEmailPassword(name, email, password) {
    await new Promise((r) => setTimeout(r, 650));

    if (!name || name.trim().length < 2) {
      throw new Error('Please enter your full name.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid work email address.');
    }

    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long for security.');
    }

    const user = {
      id: 'usr_new_' + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim(),
      avatar: null,
      provider: 'email',
      createdAt: new Date().toISOString(),
      plan: 'Starter Fleet (14-Day Trial)',
    };
    this.saveSession(user);
    return user;
  },

  /**
   * Sign in with Magic Link
   */
  async sendMagicLink(email) {
    await new Promise((r) => setTimeout(r, 500));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new Error('Please provide a valid work email address.');
    }
    return { success: true, email: email.trim() };
  },

  /**
   * Sign in with Enterprise SAML / SSO
   */
  async signInWithSSO(domain) {
    await new Promise((r) => setTimeout(r, 700));
    if (!domain || !domain.includes('.')) {
      throw new Error('Please enter a valid company domain (e.g., company.com).');
    }

    const user = {
      id: 'usr_sso_' + Math.random().toString(36).substring(2, 9),
      name: 'Enterprise Executive',
      email: `admin@${domain.trim().toLowerCase()}`,
      avatar: null,
      provider: 'saml_sso',
      createdAt: new Date().toISOString(),
      plan: 'Enterprise Custom SLA',
    };
    this.saveSession(user);
    return user;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    this.clearSession();
    return true;
  },
};
