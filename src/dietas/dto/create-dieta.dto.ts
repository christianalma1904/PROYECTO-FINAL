import { IsString, IsArray, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para @Type si usas validación anidada

// Si tu SemanaDieta es un DTO anidado, deberías definirlo así:
export class SemanaDietaDto {
  @IsNumber()
  semana: number;

  @IsArray()
  @IsString({ each: true })
  menu: string[];
}

export class CreateDietaDto {
  @IsString()
  paciente_id: string;

  @IsString()
  @IsOptional() // Si plan_id es opcional en el POST
  plan_id?: string;

  @IsArray()
  // @ValidateNested({ each: true }) // Descomentar si SemanaDietaDto es una clase DTO real
  // @Type(() => SemanaDietaDto) // Descomentar y definir SemanaDietaDto si es una clase DTO real
  semanas: Array<{
    semana: number;
    menu: string[];
  }>; // Asegúrate de que esta estructura coincide con tu frontend

  // ¡CAMPOS AÑADIDOS!
  @IsString()
  @IsOptional() // Quita IsOptional() si 'nombre' es obligatorio
  nombre?: string;

  @IsString()
  @IsOptional() // Quita IsOptional() si 'descripcion' es obligatoria
  descripcion?: string;

  @IsDateString() // Valida que sea una cadena de fecha ISO (ej. "2023-01-01")
  @IsOptional() // Quita IsOptional() si 'fechaAsignacion' es obligatoria
  fechaAsignacion?: string;
}