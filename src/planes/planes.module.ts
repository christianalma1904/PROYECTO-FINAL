import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
