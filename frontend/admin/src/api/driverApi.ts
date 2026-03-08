import axios from 'axios';
import type { Driver, CreateDriverDto, UpdateDriverDto } from '../types/driver';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDrivers = () =>
  api.get<Driver[]>('/drivers');

export const getDriver = (id: number) =>
  api.get<Driver>(`/drivers/${id}`);

export const createDriver = (data: CreateDriverDto) =>
  api.post<Driver>('/drivers', data);

export const updateDriver = (id: number, data: UpdateDriverDto) =>
  api.put<Driver>(`/drivers/${id}`, data);

export const deleteDriver = (id: number) =>
  api.delete(`/drivers/${id}`);
