import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateNutricionistaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
