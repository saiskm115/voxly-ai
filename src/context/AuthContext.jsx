import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    try {
      const activeUser = authService.getSession();
      if (activeUser) {
        setUser(activeUser);
      }
    } catch (e) {
      console.warn('Could not restore auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    const loggedUser = await authService.signInWithGoogle();
    setUser(loggedUser);
    return loggedUser;
  };

  const loginWithGithub = async () => {
    const loggedUser = await authService.signInWithGithub();
    setUser(loggedUser);
    return loggedUser;
  };

  const loginWithEmail = async (email, password) => {
    const loggedUser = await authService.signInWithEmailPassword(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const signupWithEmail = async (name, email, password) => {
    const loggedUser = await authService.signUpWithEmailPassword(name, email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginWithMagicLink = async (email) => {
    return await authService.sendMagicLink(email);
  };

  const loginWithSSO = async (domain) => {
    const loggedUser = await authService.signInWithSSO(domain);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    signupWithEmail,
    loginWithMagicLink,
    loginWithSSO,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
