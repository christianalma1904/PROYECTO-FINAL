// src/dietas/dto/update-dieta.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaDto } from './create-dieta.dto';

export class UpdateDietaDto extends PartialType(CreateDietaDto) {}
