import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleOrmEntity } from './infrastructure/persistence/vehicle.orm-entity.js';
import { VehicleRepositoryAdapter } from './infrastructure/persistence/vehicle-repository.adapter.js';
import { VEHICLE_REPOSITORY_PORT } from './domain/vehicle-repository.port.js';
import { CreateVehicleUseCase } from './application/use-cases/create-vehicle.use-case.js';
import { ListVehiclesUseCase } from './application/use-cases/list-vehicles.use-case.js';
import { GetVehicleUseCase } from './application/use-cases/get-vehicle.use-case.js';
import { UpdateVehicleUseCase } from './application/use-cases/update-vehicle.use-case.js';
import { DeleteVehicleUseCase } from './application/use-cases/delete-vehicle.use-case.js';
import { VehicleController } from './vehicle.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleOrmEntity])],
  controllers: [VehicleController],
  providers: [
    // Adapters bound to Ports
    { provide: VEHICLE_REPOSITORY_PORT, useClass: VehicleRepositoryAdapter },

    // Use Cases
    CreateVehicleUseCase,
    ListVehiclesUseCase,
    GetVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
  exports: [VEHICLE_REPOSITORY_PORT],
})
export class VehicleModule {}
