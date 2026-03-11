import axios from 'axios';
import type { SougeiSchedule, CreateSougeiScheduleDto, UpdateSougeiScheduleDto } from '../types/sougeiSchedule';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSougeiSchedules = (date?: string, type?: string) =>
  api.get<SougeiSchedule[]>('/sougei-schedules', { params: { date, type } });

export const getSougeiSchedule = (id: number) =>
  api.get<SougeiSchedule>(`/sougei-schedules/${id}`);

export const createSougeiSchedule = (data: CreateSougeiScheduleDto) =>
  api.post<SougeiSchedule>('/sougei-schedules', data);

export const updateSougeiSchedule = (id: number, data: UpdateSougeiScheduleDto) =>
  api.put<SougeiSchedule>(`/sougei-schedules/${id}`, data);

export const deleteSougeiSchedule = (id: number) =>
  api.delete(`/sougei-schedules/${id}`);
