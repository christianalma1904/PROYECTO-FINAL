import { IsString, IsNumber, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MedidasDto {
  @IsNumber()
  cintura: number;

  @IsNumber()
  cadera: number;
}

export class CreateSeguimientoDto {
  @IsString()
  paciente_id: string;

  @IsNumber()
  semana: number;

  @IsNumber()
  peso: number;

  @ValidateNested()
  @Type(() => MedidasDto)
  medidas: MedidasDto;

  @IsArray()
  @IsString({ each: true })
  fotos: string[];

  @IsDateString()
  fecha: string;
}
