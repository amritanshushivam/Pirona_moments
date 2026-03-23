'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'customer' | 'admin' | 'vendor' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  phone?: string;
  businessName?: string; // For vendors
  services?: string[]; // For vendors
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  isLoading: boolean;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  adminLogin: (role: 'admin' | 'vendor') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserType(parsedUser.userType);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: UserType) => {
    setIsLoading(true);
    try {
      // Simulate login - in real app, call backend
      if (!email || !password) {
        throw new Error('Email and password required');
      }

      // Mock validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        userType: type || 'customer',
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setUserType(newUser.userType);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error('All fields required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists (in real app, check with backend)
      const existingUser = localStorage.getItem(`user_${email}`);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        userType: 'customer',
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setUserType('customer');
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (role: 'admin' | 'vendor') => {
    setIsLoading(true);
    try {
      const roleType: UserType = role === 'admin' ? 'admin' : 'vendor';
      const newUser: User = {
        id: `${role}_${Date.now()}`,
        email: `${role}@pirona.com`,
        name: role === 'admin' ? 'Admin User' : 'Vendor User',
        userType: roleType,
        businessName: role === 'vendor' ? 'Wedding Services' : undefined,
        services: role === 'vendor' ? ['Catering', 'Decoration'] : undefined,
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setUserType(roleType);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, isLoading, login, signup, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
