import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateSougeiScheduleUseCase } from './application/use-cases/create-sougei-schedule.use-case.js';
import { ListSougeiSchedulesUseCase } from './application/use-cases/list-sougei-schedules.use-case.js';
import { GetSougeiScheduleUseCase } from './application/use-cases/get-sougei-schedule.use-case.js';
import { UpdateSougeiScheduleUseCase } from './application/use-cases/update-sougei-schedule.use-case.js';
import { DeleteSougeiScheduleUseCase } from './application/use-cases/delete-sougei-schedule.use-case.js';
import { CreateSougeiScheduleDto } from './application/dto/create-sougei-schedule.dto.js';
import { UpdateSougeiScheduleDto } from './application/dto/update-sougei-schedule.dto.js';

@Controller('api/sougei-schedules')
@UseGuards(JwtAuthGuard)
export class SougeiScheduleController {
  constructor(
    private readonly createSougeiScheduleUseCase: CreateSougeiScheduleUseCase,
    private readonly listSougeiSchedulesUseCase: ListSougeiSchedulesUseCase,
    private readonly getSougeiScheduleUseCase: GetSougeiScheduleUseCase,
    private readonly updateSougeiScheduleUseCase: UpdateSougeiScheduleUseCase,
    private readonly deleteSougeiScheduleUseCase: DeleteSougeiScheduleUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateSougeiScheduleDto) {
    return this.createSougeiScheduleUseCase.execute(dto);
  }

  @Get()
  async findAll(@Query('date') date?: string, @Query('type') scheduleType?: string) {
    return this.listSougeiSchedulesUseCase.execute(date, scheduleType);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getSougeiScheduleUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSougeiScheduleDto) {
    return this.updateSougeiScheduleUseCase.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteSougeiScheduleUseCase.execute(id);
    return { message: 'SougeiSchedule deleted successfully' };
  }
}
