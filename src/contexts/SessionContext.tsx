import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Mock Types for Prototyping ---
export interface MockUserProfileMetadata {
  name: string;
  district: string;
  role: 'farmer' | 'buyer' | 'executive';
  nid: string;
  mobile: string;
  farmSize: number;
  [key: string]: any;
}

export interface MockUserProfile {
  id: string;
  email: string;
  user_metadata: MockUserProfileMetadata;
}

// Type used for storage in the mock database (includes password for mock login check)
export interface MockDbUser extends MockUserProfile {
    password?: string; 
}

interface MockSession {
  user: MockUserProfile;
  access_token: string;
}

interface SessionContextType {
  session: MockSession | null;
  user: MockUserProfile | null;
  isLoading: boolean;
  mockLogin: (userData: MockUserProfile) => void;
  mockLogout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);
const MOCK_SESSION_KEY = 'mock_session';
export const MOCK_USER_DB_KEY = 'mock_user_database'; // NEW KEY for the dynamic user database

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<MockSession | null>(null);
  const [user, setUser] = useState<MockUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const mockLogin = (userData: MockUserProfile) => {
    const mockSession: MockSession = {
      user: userData,
      access_token: 'mock_token_123',
    };
    // When storing the session, ensure we only store the clean MockUserProfile structure
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mockSession));
    setSession(mockSession);
    setUser(userData);
    navigate('/dashboard');
  };

  const mockLogout = () => {
    localStorage.removeItem(MOCK_SESSION_KEY);
    setSession(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    // Load initial session from local storage
    const storedSession = localStorage.getItem(MOCK_SESSION_KEY);
    if (storedSession) {
      try {
        const parsedSession: MockSession = JSON.parse(storedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (e) {
        console.error("Failed to parse mock session:", e);
        localStorage.removeItem(MOCK_SESSION_KEY);
      }
    }
    setIsLoading(false);

    // Handle initial redirect logic
    const currentPath = window.location.pathname;
    const isAuthenticated = !!storedSession;

    if (isAuthenticated && (currentPath === '/login' || currentPath === '/signup' || currentPath === '/')) {
      navigate('/dashboard');
    } else if (!isAuthenticated && currentPath !== '/login' && currentPath !== '/' && currentPath !== '/signup') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, isLoading, mockLogin, mockLogout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};