import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DriverEntity } from '../../domain/driver.entity.js';
import { type DriverRepositoryPort, DRIVER_REPOSITORY_PORT } from '../../domain/driver-repository.port.js';
import { UpdateDriverDto } from '../dto/update-driver.dto.js';

@Injectable()
export class UpdateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY_PORT)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(id: number, dto: UpdateDriverDto): Promise<DriverEntity> {
    const existing = await this.driverRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    const { licenseIssuedDate, licenseExpiryDate, ...rest } = dto;
    const partial: Partial<DriverEntity> = { ...rest };
    if (licenseIssuedDate !== undefined) partial.licenseIssuedDate = new Date(licenseIssuedDate);
    if (licenseExpiryDate !== undefined) partial.licenseExpiryDate = new Date(licenseExpiryDate);
    const updated = await this.driverRepository.update(id, partial);
    return updated!;
  }
}
