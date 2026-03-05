import axios from 'axios';
import type { AuthResponse, User } from '../types/auth';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const register = (email: string, password: string) =>
  api.post<User>('/api/auth', { email, password });

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/api/auth/login', { email, password });

export const getMe = (token: string) =>
  api.get<User>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
