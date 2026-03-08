import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateVehicleUseCase } from './application/use-cases/create-vehicle.use-case.js';
import { ListVehiclesUseCase } from './application/use-cases/list-vehicles.use-case.js';
import { GetVehicleUseCase } from './application/use-cases/get-vehicle.use-case.js';
import { UpdateVehicleUseCase } from './application/use-cases/update-vehicle.use-case.js';
import { DeleteVehicleUseCase } from './application/use-cases/delete-vehicle.use-case.js';
import { CreateVehicleDto } from './application/dto/create-vehicle.dto.js';
import { UpdateVehicleDto } from './application/dto/update-vehicle.dto.js';

@Controller('api/vehicles')
@UseGuards(JwtAuthGuard)
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly listVehiclesUseCase: ListVehiclesUseCase,
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateVehicleDto) {
    return this.createVehicleUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.listVehiclesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getVehicleUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleDto) {
    return this.updateVehicleUseCase.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteVehicleUseCase.execute(id);
    return { message: 'Vehicle deleted successfully' };
  }
}
