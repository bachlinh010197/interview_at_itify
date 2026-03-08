import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString } from 'class-validator';

export class UpdateDriverDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  licenseNumber?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['普通自動車免許', '準中型自動車免許', '中型自動車免許', '大型自動車免許'])
  @IsOptional()
  licenseType?: string;

  @IsDateString()
  @IsOptional()
  licenseIssuedDate?: string;

  @IsDateString()
  @IsOptional()
  licenseExpiryDate?: string;
}
