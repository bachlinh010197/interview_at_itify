import axios from 'axios';
import type { AuthResponse, User } from '../types/auth';

const api = axios.create({ baseURL: '/api' });

export const register = (email: string, password: string) =>
  api.post<User>('/auth', { email, password });

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password });

export const getMe = (token: string) =>
  api.get<User>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
