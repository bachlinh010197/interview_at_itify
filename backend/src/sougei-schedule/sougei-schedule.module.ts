import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SougeiScheduleOrmEntity } from './infrastructure/persistence/sougei-schedule.orm-entity.js';
import { SougeiScheduleRepositoryAdapter } from './infrastructure/persistence/sougei-schedule-repository.adapter.js';
import { SOUGEI_SCHEDULE_REPOSITORY_PORT } from './domain/sougei-schedule-repository.port.js';
import { CreateSougeiScheduleUseCase } from './application/use-cases/create-sougei-schedule.use-case.js';
import { ListSougeiSchedulesUseCase } from './application/use-cases/list-sougei-schedules.use-case.js';
import { GetSougeiScheduleUseCase } from './application/use-cases/get-sougei-schedule.use-case.js';
import { UpdateSougeiScheduleUseCase } from './application/use-cases/update-sougei-schedule.use-case.js';
import { DeleteSougeiScheduleUseCase } from './application/use-cases/delete-sougei-schedule.use-case.js';
import { SougeiScheduleController } from './sougei-schedule.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SougeiScheduleOrmEntity])],
  controllers: [SougeiScheduleController],
  providers: [
    // Adapters bound to Ports
    { provide: SOUGEI_SCHEDULE_REPOSITORY_PORT, useClass: SougeiScheduleRepositoryAdapter },

    // Use Cases
    CreateSougeiScheduleUseCase,
    ListSougeiSchedulesUseCase,
    GetSougeiScheduleUseCase,
    UpdateSougeiScheduleUseCase,
    DeleteSougeiScheduleUseCase,
  ],
  exports: [SOUGEI_SCHEDULE_REPOSITORY_PORT],
})
export class SougeiScheduleModule {}
