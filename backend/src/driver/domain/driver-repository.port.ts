import { DriverEntity } from './driver.entity.js';

export interface DriverRepositoryPort {
  save(driver: DriverEntity): Promise<DriverEntity>;
  findAll(): Promise<DriverEntity[]>;
  findById(id: number): Promise<DriverEntity | null>;
  update(id: number, driver: Partial<DriverEntity>): Promise<DriverEntity | null>;
  delete(id: number): Promise<void>;
}

export const DRIVER_REPOSITORY_PORT = Symbol('DRIVER_REPOSITORY_PORT');
