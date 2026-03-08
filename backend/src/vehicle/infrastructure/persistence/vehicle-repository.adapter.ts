import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../../domain/vehicle.entity.js';
import { type VehicleRepositoryPort } from '../../domain/vehicle-repository.port.js';
import { VehicleOrmEntity } from './vehicle.orm-entity.js';

@Injectable()
export class VehicleRepositoryAdapter implements VehicleRepositoryPort {
  constructor(
    @InjectRepository(VehicleOrmEntity)
    private readonly repository: Repository<VehicleOrmEntity>,
  ) {}

  async save(vehicle: VehicleEntity): Promise<VehicleEntity> {
    const ormEntity = this.repository.create({
      name: vehicle.name,
      numberPlate: vehicle.numberPlate,
      seatCount: vehicle.seatCount,
      hasWheelchair: vehicle.hasWheelchair ?? false,
      responsible: vehicle.responsible,
    });
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<VehicleEntity[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: number): Promise<VehicleEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async update(id: number, vehicle: Partial<VehicleEntity>): Promise<VehicleEntity | null> {
    await this.repository.update(id, {
      ...(vehicle.name !== undefined && { name: vehicle.name }),
      ...(vehicle.numberPlate !== undefined && { numberPlate: vehicle.numberPlate }),
      ...(vehicle.seatCount !== undefined && { seatCount: vehicle.seatCount }),
      ...(vehicle.hasWheelchair !== undefined && { hasWheelchair: vehicle.hasWheelchair }),
      ...(vehicle.responsible !== undefined && { responsible: vehicle.responsible }),
    });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(orm: VehicleOrmEntity): VehicleEntity {
    return new VehicleEntity({
      id: orm.id,
      name: orm.name,
      numberPlate: orm.numberPlate,
      seatCount: orm.seatCount,
      hasWheelchair: orm.hasWheelchair,
      responsible: orm.responsible,
      createdAt: orm.createdAt,
    });
  }
}
