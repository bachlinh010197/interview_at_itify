import axios from 'axios';
import type { Vehicle, CreateVehicleDto, UpdateVehicleDto } from '../types/vehicle';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getVehicles = () =>
  api.get<Vehicle[]>('/vehicles');

export const getVehicle = (id: number) =>
  api.get<Vehicle>(`/vehicles/${id}`);

export const createVehicle = (data: CreateVehicleDto) =>
  api.post<Vehicle>('/vehicles', data);

export const updateVehicle = (id: number, data: UpdateVehicleDto) =>
  api.put<Vehicle>(`/vehicles/${id}`, data);

export const deleteVehicle = (id: number) =>
  api.delete(`/vehicles/${id}`);
