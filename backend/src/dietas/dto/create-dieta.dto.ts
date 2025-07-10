import { IsString, IsArray } from 'class-validator';

export class CreateDietaDto {
  @IsString()
  paciente_id: string;

  @IsString()
  plan_id: string;

  @IsArray()
  semanas: Array<{
    semana: number;
    menu: string[];
  }>;
}
