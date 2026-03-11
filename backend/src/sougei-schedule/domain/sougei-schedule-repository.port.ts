import { SougeiScheduleEntity } from './sougei-schedule.entity.js';

export interface SougeiScheduleRepositoryPort {
  save(schedule: SougeiScheduleEntity): Promise<SougeiScheduleEntity>;
  findAll(): Promise<SougeiScheduleEntity[]>;
  findById(id: number): Promise<SougeiScheduleEntity | null>;
  findByDate(date: Date): Promise<SougeiScheduleEntity[]>;
  findByDateAndType(date: Date, scheduleType: string): Promise<SougeiScheduleEntity[]>;
  update(id: number, schedule: Partial<SougeiScheduleEntity>): Promise<SougeiScheduleEntity | null>;
  delete(id: number): Promise<void>;
}

export const SOUGEI_SCHEDULE_REPOSITORY_PORT = Symbol('SOUGEI_SCHEDULE_REPOSITORY_PORT');
