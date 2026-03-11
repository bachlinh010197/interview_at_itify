import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SougeiScheduleEntity } from '../../domain/sougei-schedule.entity.js';
import { type SougeiScheduleRepositoryPort } from '../../domain/sougei-schedule-repository.port.js';
import { SougeiScheduleOrmEntity } from './sougei-schedule.orm-entity.js';

@Injectable()
export class SougeiScheduleRepositoryAdapter implements SougeiScheduleRepositoryPort {
  constructor(
    @InjectRepository(SougeiScheduleOrmEntity)
    private readonly repository: Repository<SougeiScheduleOrmEntity>,
  ) {}

  async save(schedule: SougeiScheduleEntity): Promise<SougeiScheduleEntity> {
    const ormEntity = this.repository.create({
      userName: schedule.userName,
      scheduleDate: schedule.scheduleDate,
      scheduleType: schedule.scheduleType,
      residenceType: schedule.residenceType,
      municipality: schedule.municipality,
      vehicleId: schedule.vehicleId,
      driverId: schedule.driverId,
      scheduledTime: schedule.scheduledTime,
      actualTime: schedule.actualTime,
      note: schedule.note,
    });
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<SougeiScheduleEntity[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: number): Promise<SougeiScheduleEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async findByDate(date: Date): Promise<SougeiScheduleEntity[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const entities = await this.repository.find({
      where: { scheduleDate: Between(start, end) },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByDateAndType(date: Date, scheduleType: string): Promise<SougeiScheduleEntity[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const entities = await this.repository.find({
      where: { scheduleDate: Between(start, end), scheduleType },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async update(id: number, schedule: Partial<SougeiScheduleEntity>): Promise<SougeiScheduleEntity | null> {
    await this.repository.update(id, {
      ...(schedule.userName !== undefined && { userName: schedule.userName }),
      ...(schedule.scheduleDate !== undefined && { scheduleDate: schedule.scheduleDate }),
      ...(schedule.scheduleType !== undefined && { scheduleType: schedule.scheduleType }),
      ...(schedule.residenceType !== undefined && { residenceType: schedule.residenceType }),
      ...(schedule.municipality !== undefined && { municipality: schedule.municipality }),
      ...(schedule.vehicleId !== undefined && { vehicleId: schedule.vehicleId }),
      ...(schedule.driverId !== undefined && { driverId: schedule.driverId }),
      ...(schedule.scheduledTime !== undefined && { scheduledTime: schedule.scheduledTime }),
      ...(schedule.actualTime !== undefined && { actualTime: schedule.actualTime }),
      ...(schedule.note !== undefined && { note: schedule.note }),
    });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(orm: SougeiScheduleOrmEntity): SougeiScheduleEntity {
    return new SougeiScheduleEntity({
      id: orm.id,
      userName: orm.userName,
      scheduleDate: orm.scheduleDate,
      scheduleType: orm.scheduleType,
      residenceType: orm.residenceType,
      municipality: orm.municipality,
      vehicleId: orm.vehicleId,
      driverId: orm.driverId,
      scheduledTime: orm.scheduledTime,
      actualTime: orm.actualTime,
      note: orm.note,
      createdAt: orm.createdAt,
    });
  }
}
