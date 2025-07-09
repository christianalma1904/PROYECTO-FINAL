import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';

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

  async create(data: Partial<Plan>) {
    const plan = this.planesRepo.create(data);
    return this.planesRepo.save(plan);
  }

  async update(id: number, data: Partial<Plan>) {
    await this.planesRepo.update(id, data);
    const updated = await this.planesRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Plan no encontrado');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.planesRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Plan no encontrado');
    return { message: 'Plan eliminado' };
  }
}
