import axios from 'axios';
import type { AuthResponse, User } from '../types/auth';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password });

export const getMe = (token: string) =>
  api.get<User>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
