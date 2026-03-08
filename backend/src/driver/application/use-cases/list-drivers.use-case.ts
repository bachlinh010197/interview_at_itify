import { Inject, Injectable } from '@nestjs/common';
import { DriverEntity } from '../../domain/driver.entity.js';
import { type DriverRepositoryPort, DRIVER_REPOSITORY_PORT } from '../../domain/driver-repository.port.js';

@Injectable()
export class ListDriversUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY_PORT)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(): Promise<DriverEntity[]> {
    return this.driverRepository.findAll();
  }
}
