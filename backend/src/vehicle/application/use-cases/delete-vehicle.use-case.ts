import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type VehicleRepositoryPort, VEHICLE_REPOSITORY_PORT } from '../../domain/vehicle-repository.port.js';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY_PORT)
    private readonly vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.vehicleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    await this.vehicleRepository.delete(id);
  }
}
