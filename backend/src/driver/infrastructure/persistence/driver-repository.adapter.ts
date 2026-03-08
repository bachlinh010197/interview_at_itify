import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from '../../domain/driver.entity.js';
import { type DriverRepositoryPort } from '../../domain/driver-repository.port.js';
import { DriverOrmEntity } from './driver.orm-entity.js';

@Injectable()
export class DriverRepositoryAdapter implements DriverRepositoryPort {
  constructor(
    @InjectRepository(DriverOrmEntity)
    private readonly repository: Repository<DriverOrmEntity>,
  ) {}

  async save(driver: DriverEntity): Promise<DriverEntity> {
    const ormEntity = this.repository.create({
      name: driver.name,
      phone: driver.phone,
      address: driver.address,
      licenseNumber: driver.licenseNumber,
      licenseType: driver.licenseType,
      licenseIssuedDate: driver.licenseIssuedDate,
      licenseExpiryDate: driver.licenseExpiryDate,
    });
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<DriverEntity[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: number): Promise<DriverEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async update(id: number, driver: Partial<DriverEntity>): Promise<DriverEntity | null> {
    await this.repository.update(id, {
      ...(driver.name !== undefined && { name: driver.name }),
      ...(driver.phone !== undefined && { phone: driver.phone }),
      ...(driver.address !== undefined && { address: driver.address }),
      ...(driver.licenseNumber !== undefined && { licenseNumber: driver.licenseNumber }),
      ...(driver.licenseType !== undefined && { licenseType: driver.licenseType }),
      ...(driver.licenseIssuedDate !== undefined && { licenseIssuedDate: driver.licenseIssuedDate }),
      ...(driver.licenseExpiryDate !== undefined && { licenseExpiryDate: driver.licenseExpiryDate }),
    });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(orm: DriverOrmEntity): DriverEntity {
    return new DriverEntity({
      id: orm.id,
      name: orm.name,
      phone: orm.phone,
      address: orm.address,
      licenseNumber: orm.licenseNumber,
      licenseType: orm.licenseType,
      licenseIssuedDate: orm.licenseIssuedDate,
      licenseExpiryDate: orm.licenseExpiryDate,
      createdAt: orm.createdAt,
    });
  }
}
