import { IsString, IsNumber, IsArray, IsDateString } from 'class-validator';

export class CreateSeguimientoDto {
  @IsString()
  paciente_id: string;

  @IsNumber()
  semana: number;

  @IsNumber()
  peso: number;

  medidas: {
    cintura: number;
    cadera: number;
  };

  @IsArray()
  fotos: string[];

  @IsDateString()
  fecha: string;
}
