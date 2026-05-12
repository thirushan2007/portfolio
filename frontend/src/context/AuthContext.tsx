import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest } from '../types';
import { authService } from '../services/portfolioService';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('portfolio_token');
    const savedUser = sessionStorage.getItem('portfolio_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Strict hardcoded credential check
      if (data.username !== 'Thirushan_2007' || data.password !== 'DharThirushan@07') {
        throw new Error('Invalid credentials');
      }

      // Now fetch the real JWT token from the secure backend
      const response = await authService.login(data);
      const authData: AuthResponse = response.data;
      const userData: User = {
        id: '1',
        username: authData.username,
        email: authData.email,
        role: 'ADMIN',
      };
      setToken(authData.token);
      setUser(userData);
      sessionStorage.setItem('portfolio_token', authData.token);
      sessionStorage.setItem('portfolio_user', JSON.stringify(userData));
      toast.success('Welcome back, Thirushan!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
