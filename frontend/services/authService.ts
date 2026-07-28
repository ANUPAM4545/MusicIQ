import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';

const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
  const authData = response.data.data;
  if (authData && authData.token) {
    setToken(authData.token);
  }
  return authData;
};

const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
  const authData = response.data.data;
  if (authData && authData.token) {
    setToken(authData.token);
  }
  return authData;
};

const logout = () => {
  removeToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const authService = {
  login,
  register,
  logout,
  getToken,
  removeToken,
  isAuthenticated,
};
