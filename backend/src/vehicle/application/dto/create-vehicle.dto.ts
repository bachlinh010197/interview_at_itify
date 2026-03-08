import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @IsNumber()
  @IsNotEmpty()
  seatCount: number;

  @IsBoolean()
  @IsOptional()
  hasWheelchair?: boolean;

  @IsString()
  @IsNotEmpty()
  responsible: string;
}
