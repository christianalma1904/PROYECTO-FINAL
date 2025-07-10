import { IsString, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;
}
