import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
