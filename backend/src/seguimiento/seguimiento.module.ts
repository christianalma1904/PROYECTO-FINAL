import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeguimientoSchema } from './seguimiento.schema';
import { SeguimientoController } from './seguimiento.controller';
import { SeguimientoService } from './seguimiento.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seguimiento', schema: SeguimientoSchema }]),
  ],
  controllers: [SeguimientoController],
  providers: [SeguimientoService],
})
export class SeguimientoModule {}
