import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    if (email && password) {
      setUser({
        id: 1,
        name: 'John Doe',
        email: email,
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001'
      });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would call an API
    if (name && email && password) {
      setUser({
        id: 1,
        name: name,
        email: email
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
