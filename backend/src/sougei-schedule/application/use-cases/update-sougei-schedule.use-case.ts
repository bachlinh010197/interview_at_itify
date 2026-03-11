import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SougeiScheduleEntity } from '../../domain/sougei-schedule.entity.js';
import { type SougeiScheduleRepositoryPort, SOUGEI_SCHEDULE_REPOSITORY_PORT } from '../../domain/sougei-schedule-repository.port.js';
import { UpdateSougeiScheduleDto } from '../dto/update-sougei-schedule.dto.js';

@Injectable()
export class UpdateSougeiScheduleUseCase {
  constructor(
    @Inject(SOUGEI_SCHEDULE_REPOSITORY_PORT)
    private readonly scheduleRepository: SougeiScheduleRepositoryPort,
  ) {}

  async execute(id: number, dto: UpdateSougeiScheduleDto): Promise<SougeiScheduleEntity> {
    const existing = await this.scheduleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`SougeiSchedule with id ${id} not found`);
    }
    const { scheduleDate, ...rest } = dto;
    const partial: Partial<SougeiScheduleEntity> = { ...rest };
    if (scheduleDate !== undefined) partial.scheduleDate = new Date(scheduleDate);
    const updated = await this.scheduleRepository.update(id, partial);
    return updated!;
  }
}
