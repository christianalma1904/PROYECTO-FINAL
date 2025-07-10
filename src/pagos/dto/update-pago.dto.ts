import { IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdatePagoDto {
  @IsOptional()
  @IsNumber()
  paciente?: number;

  @IsOptional()
  @IsNumber()
  plan?: number;

  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;
}
