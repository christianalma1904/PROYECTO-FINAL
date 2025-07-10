import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutricionista } from './nutricionista.entity';
import { NutricionistasService } from './nutricionistas.service';
import { NutricionistasController } from './nutricionistas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nutricionista])],
  controllers: [NutricionistasController],
  providers: [NutricionistasService],
})
export class NutricionistasModule {}
