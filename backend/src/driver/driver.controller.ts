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
import { CreateDriverUseCase } from './application/use-cases/create-driver.use-case.js';
import { ListDriversUseCase } from './application/use-cases/list-drivers.use-case.js';
import { GetDriverUseCase } from './application/use-cases/get-driver.use-case.js';
import { UpdateDriverUseCase } from './application/use-cases/update-driver.use-case.js';
import { DeleteDriverUseCase } from './application/use-cases/delete-driver.use-case.js';
import { CreateDriverDto } from './application/dto/create-driver.dto.js';
import { UpdateDriverDto } from './application/dto/update-driver.dto.js';

@Controller('api/drivers')
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    private readonly listDriversUseCase: ListDriversUseCase,
    private readonly getDriverUseCase: GetDriverUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase,
    private readonly deleteDriverUseCase: DeleteDriverUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateDriverDto) {
    return this.createDriverUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.listDriversUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getDriverUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDriverDto) {
    return this.updateDriverUseCase.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteDriverUseCase.execute(id);
    return { message: 'Driver deleted successfully' };
  }
}
