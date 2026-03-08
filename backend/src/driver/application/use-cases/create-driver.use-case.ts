import { Inject, Injectable } from '@nestjs/common';
import { DriverEntity } from '../../domain/driver.entity.js';
import { type DriverRepositoryPort, DRIVER_REPOSITORY_PORT } from '../../domain/driver-repository.port.js';
import { CreateDriverDto } from '../dto/create-driver.dto.js';

@Injectable()
export class CreateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY_PORT)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(dto: CreateDriverDto): Promise<DriverEntity> {
    const driver = new DriverEntity({
      name: dto.name,
      phone: dto.phone,
      address: dto.address,
      licenseNumber: dto.licenseNumber,
      licenseType: dto.licenseType,
      licenseIssuedDate: new Date(dto.licenseIssuedDate),
      licenseExpiryDate: new Date(dto.licenseExpiryDate),
    });
    return this.driverRepository.save(driver);
  }
}
