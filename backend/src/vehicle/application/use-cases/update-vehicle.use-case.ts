import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleEntity } from '../../domain/vehicle.entity.js';
import { type VehicleRepositoryPort, VEHICLE_REPOSITORY_PORT } from '../../domain/vehicle-repository.port.js';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto.js';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY_PORT)
    private readonly vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number, dto: UpdateVehicleDto): Promise<VehicleEntity> {
    const existing = await this.vehicleRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    const updated = await this.vehicleRepository.update(id, dto);
    return updated!;
  }
}
