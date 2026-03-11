import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString, IsNumber } from 'class-validator';

export class CreateSougeiScheduleDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsDateString()
  @IsNotEmpty()
  scheduleDate: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['お迎え', 'お送り'])
  scheduleType: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['自宅', '入所系サービス'])
  residenceType: string;

  @IsString()
  @IsOptional()
  municipality?: string;

  @IsNumber()
  @IsOptional()
  vehicleId?: number;

  @IsNumber()
  @IsOptional()
  driverId?: number;

  @IsString()
  @IsOptional()
  scheduledTime?: string;

  @IsString()
  @IsOptional()
  actualTime?: string;

  @IsString()
  @IsOptional()
  note?: string;
}
