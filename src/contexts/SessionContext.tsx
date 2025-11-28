import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Mock Types for Prototyping ---
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    district: string;
    role: string;
    [key: string]: any;
  };
}

interface MockSession {
  user: MockUser;
  access_token: string;
}

interface SessionContextType {
  session: MockSession | null;
  user: MockUser | null;
  isLoading: boolean;
  mockLogin: (userData: MockUser) => void;
  mockLogout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);
const MOCK_SESSION_KEY = 'mock_session';

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<MockSession | null>(null);
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const mockLogin = (userData: MockUser) => {
    const mockSession: MockSession = {
      user: userData,
      access_token: 'mock_token_123',
    };
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