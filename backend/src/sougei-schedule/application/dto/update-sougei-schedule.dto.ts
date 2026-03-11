import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString, IsNumber } from 'class-validator';

export class UpdateSougeiScheduleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName?: string;

  @IsDateString()
  @IsOptional()
  scheduleDate?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['お迎え', 'お送り'])
  @IsOptional()
  scheduleType?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['自宅', '入所系サービス'])
  @IsOptional()
  residenceType?: string;

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
