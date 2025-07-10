import { IsString, IsEmail } from 'class-validator';

export class CreateNutricionistaDto {
  @IsString()
  nombre: string;

  @IsString()
  especialidad: string;

  @IsEmail()
  email: string;
}
