import { Inject, Injectable } from '@nestjs/common';
import { VehicleEntity } from '../../domain/vehicle.entity.js';
import { type VehicleRepositoryPort, VEHICLE_REPOSITORY_PORT } from '../../domain/vehicle-repository.port.js';

@Injectable()
export class ListVehiclesUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY_PORT)
    private readonly vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.findAll();
  }
}
