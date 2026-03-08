import { VehicleEntity } from './vehicle.entity.js';

export interface VehicleRepositoryPort {
  save(vehicle: VehicleEntity): Promise<VehicleEntity>;
  findAll(): Promise<VehicleEntity[]>;
  findById(id: number): Promise<VehicleEntity | null>;
  update(id: number, vehicle: Partial<VehicleEntity>): Promise<VehicleEntity | null>;
  delete(id: number): Promise<void>;
}

export const VEHICLE_REPOSITORY_PORT = Symbol('VEHICLE_REPOSITORY_PORT');
