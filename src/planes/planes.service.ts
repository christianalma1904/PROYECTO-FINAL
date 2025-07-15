import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plan)
    private planesRepo: Repository<Plan>,
  ) {}

  findAll() {
    return this.planesRepo.find();
  }

  findOne(id: number) {
    return this.planesRepo.findOneBy({ id });
  }

  async create(data: CreatePlanDto) {
    const plan = this.planesRepo.create(data);
    return this.planesRepo.save(plan);
  }

  async update(id: number, data: UpdatePlanDto) {
    const plan = await this.planesRepo.preload({
      id,
      ...data,
    });
    if (!plan) {
      throw new NotFoundException(`Plan con id ${id} no encontrado`);
    }
    return this.planesRepo.save(plan);
  }

  async remove(id: number) {
    const deleted = await this.planesRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Plan no encontrado');
    return { message: 'Plan eliminado' };
  }
}
