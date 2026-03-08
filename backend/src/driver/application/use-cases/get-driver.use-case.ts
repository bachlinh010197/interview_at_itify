import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DriverEntity } from '../../domain/driver.entity.js';
import { type DriverRepositoryPort, DRIVER_REPOSITORY_PORT } from '../../domain/driver-repository.port.js';

@Injectable()
export class GetDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY_PORT)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(id: number): Promise<DriverEntity> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    return driver;
  }
}
