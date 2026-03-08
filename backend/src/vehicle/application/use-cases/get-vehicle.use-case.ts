import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleEntity } from '../../domain/vehicle.entity.js';
import { type VehicleRepositoryPort, VEHICLE_REPOSITORY_PORT } from '../../domain/vehicle-repository.port.js';

@Injectable()
export class GetVehicleUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY_PORT)
    private readonly vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return vehicle;
  }
}
