import { Module } from '@nestjs/common';
import { DietasService } from './dietas.service';
import { DietasController } from './dietas.controller';

@Module({
  providers: [DietasService],
  controllers: [DietasController]
})
export class DietasModule {}
