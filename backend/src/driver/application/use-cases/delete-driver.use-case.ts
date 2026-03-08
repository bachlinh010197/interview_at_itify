import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type DriverRepositoryPort, DRIVER_REPOSITORY_PORT } from '../../domain/driver-repository.port.js';

@Injectable()
export class DeleteDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY_PORT)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.driverRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    await this.driverRepository.delete(id);
  }
}
