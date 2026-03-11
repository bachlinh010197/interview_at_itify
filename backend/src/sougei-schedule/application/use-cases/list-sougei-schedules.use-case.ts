import { Inject, Injectable } from '@nestjs/common';
import { SougeiScheduleEntity } from '../../domain/sougei-schedule.entity.js';
import { type SougeiScheduleRepositoryPort, SOUGEI_SCHEDULE_REPOSITORY_PORT } from '../../domain/sougei-schedule-repository.port.js';

@Injectable()
export class ListSougeiSchedulesUseCase {
  constructor(
    @Inject(SOUGEI_SCHEDULE_REPOSITORY_PORT)
    private readonly scheduleRepository: SougeiScheduleRepositoryPort,
  ) {}

  async execute(date?: string, scheduleType?: string): Promise<SougeiScheduleEntity[]> {
    if (date && scheduleType && scheduleType !== '全て') {
      return this.scheduleRepository.findByDateAndType(new Date(date), scheduleType);
    }
    if (date) {
      return this.scheduleRepository.findByDate(new Date(date));
    }
    return this.scheduleRepository.findAll();
  }
}
