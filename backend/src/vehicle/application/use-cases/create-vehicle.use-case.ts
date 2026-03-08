import { Inject, Injectable } from '@nestjs/common';
import { VehicleEntity } from '../../domain/vehicle.entity.js';
import { type VehicleRepositoryPort, VEHICLE_REPOSITORY_PORT } from '../../domain/vehicle-repository.port.js';
import { CreateVehicleDto } from '../dto/create-vehicle.dto.js';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY_PORT)
    private readonly vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(dto: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = new VehicleEntity({
      name: dto.name,
      numberPlate: dto.numberPlate,
      seatCount: dto.seatCount,
      hasWheelchair: dto.hasWheelchair ?? false,
      responsible: dto.responsible,
    });
    return this.vehicleRepository.save(vehicle);
  }
}
