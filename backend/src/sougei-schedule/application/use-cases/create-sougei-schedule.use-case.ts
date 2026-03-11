import { Inject, Injectable } from '@nestjs/common';
import { SougeiScheduleEntity } from '../../domain/sougei-schedule.entity.js';
import { type SougeiScheduleRepositoryPort, SOUGEI_SCHEDULE_REPOSITORY_PORT } from '../../domain/sougei-schedule-repository.port.js';
import { CreateSougeiScheduleDto } from '../dto/create-sougei-schedule.dto.js';

@Injectable()
export class CreateSougeiScheduleUseCase {
  constructor(
    @Inject(SOUGEI_SCHEDULE_REPOSITORY_PORT)
    private readonly scheduleRepository: SougeiScheduleRepositoryPort,
  ) {}

  async execute(dto: CreateSougeiScheduleDto): Promise<SougeiScheduleEntity> {
    const schedule = new SougeiScheduleEntity({
      userName: dto.userName,
      scheduleDate: new Date(dto.scheduleDate),
      scheduleType: dto.scheduleType,
      residenceType: dto.residenceType,
      municipality: dto.municipality ?? '',
      vehicleId: dto.vehicleId ?? null,
      driverId: dto.driverId ?? null,
      scheduledTime: dto.scheduledTime ?? null,
      actualTime: dto.actualTime ?? null,
      note: dto.note ?? '',
    });
    return this.scheduleRepository.save(schedule);
  }
}
