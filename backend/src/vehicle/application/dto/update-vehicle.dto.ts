import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  numberPlate?: string;

  @IsNumber()
  @IsOptional()
  seatCount?: number;

  @IsBoolean()
  @IsOptional()
  hasWheelchair?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  responsible?: string;
}
