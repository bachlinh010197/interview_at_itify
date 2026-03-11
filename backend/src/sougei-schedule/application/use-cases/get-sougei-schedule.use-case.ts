import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SougeiScheduleEntity } from '../../domain/sougei-schedule.entity.js';
import { type SougeiScheduleRepositoryPort, SOUGEI_SCHEDULE_REPOSITORY_PORT } from '../../domain/sougei-schedule-repository.port.js';

@Injectable()
export class GetSougeiScheduleUseCase {
  constructor(
    @Inject(SOUGEI_SCHEDULE_REPOSITORY_PORT)
    private readonly scheduleRepository: SougeiScheduleRepositoryPort,
  ) {}

  async execute(id: number): Promise<SougeiScheduleEntity> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`SougeiSchedule with id ${id} not found`);
    }
    return schedule;
  }
}
