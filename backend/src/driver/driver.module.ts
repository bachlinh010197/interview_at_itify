import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverOrmEntity } from './infrastructure/persistence/driver.orm-entity.js';
import { DriverRepositoryAdapter } from './infrastructure/persistence/driver-repository.adapter.js';
import { DRIVER_REPOSITORY_PORT } from './domain/driver-repository.port.js';
import { CreateDriverUseCase } from './application/use-cases/create-driver.use-case.js';
import { ListDriversUseCase } from './application/use-cases/list-drivers.use-case.js';
import { GetDriverUseCase } from './application/use-cases/get-driver.use-case.js';
import { UpdateDriverUseCase } from './application/use-cases/update-driver.use-case.js';
import { DeleteDriverUseCase } from './application/use-cases/delete-driver.use-case.js';
import { DriverController } from './driver.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([DriverOrmEntity])],
  controllers: [DriverController],
  providers: [
    // Adapters bound to Ports
    { provide: DRIVER_REPOSITORY_PORT, useClass: DriverRepositoryAdapter },

    // Use Cases
    CreateDriverUseCase,
    ListDriversUseCase,
    GetDriverUseCase,
    UpdateDriverUseCase,
    DeleteDriverUseCase,
  ],
  exports: [DRIVER_REPOSITORY_PORT],
})
export class DriverModule {}
