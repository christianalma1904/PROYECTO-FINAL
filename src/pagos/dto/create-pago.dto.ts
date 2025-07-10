import { IsNumber, IsDateString } from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  paciente: number;

  @IsNumber()
  plan: number;

  @IsNumber()
  monto: number;

  @IsDateString()
  fecha: string;
}
