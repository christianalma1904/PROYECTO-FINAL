import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
