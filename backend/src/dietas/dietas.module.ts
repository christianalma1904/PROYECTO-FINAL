import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DietaSchema } from './dieta.schema';
import { DietasController } from './dietas.controller';
import { DietasService } from './dietas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Dieta', schema: DietaSchema }]),
  ],
  controllers: [DietasController],
  providers: [DietasService],
})
export class DietasModule {}
