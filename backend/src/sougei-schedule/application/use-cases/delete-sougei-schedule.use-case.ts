import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type SougeiScheduleRepositoryPort, SOUGEI_SCHEDULE_REPOSITORY_PORT } from '../../domain/sougei-schedule-repository.port.js';

@Injectable()
export class DeleteSougeiScheduleUseCase {
  constructor(
    @Inject(SOUGEI_SCHEDULE_REPOSITORY_PORT)
    private readonly scheduleRepository: SougeiScheduleRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.scheduleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`SougeiSchedule with id ${id} not found`);
    }
    await this.scheduleRepository.delete(id);
  }
}
