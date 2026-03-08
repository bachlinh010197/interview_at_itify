import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['普通自動車免許', '準中型自動車免許', '中型自動車免許', '大型自動車免許'])
  licenseType: string;

  @IsDateString()
  @IsNotEmpty()
  licenseIssuedDate: string;

  @IsDateString()
  @IsNotEmpty()
  licenseExpiryDate: string;
}
