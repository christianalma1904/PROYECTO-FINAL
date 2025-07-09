import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutricionista } from './nutricionista.entity';

@Injectable()
export class NutricionistasService {
  constructor(
    @InjectRepository(Nutricionista)
    private nutricionistasRepo: Repository<Nutricionista>,
  ) {}

  findAll() {
    return this.nutricionistasRepo.find();
  }

  findOne(id: number) {
    return this.nutricionistasRepo.findOneBy({ id });
  }

  async create(data: Partial<Nutricionista>) {
    const nutri = this.nutricionistasRepo.create(data);
    return this.nutricionistasRepo.save(nutri);
  }

  async update(id: number, data: Partial<Nutricionista>) {
    await this.nutricionistasRepo.update(id, data);
    const updated = await this.nutricionistasRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Nutricionista no encontrado');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.nutricionistasRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Nutricionista no encontrado');
    return { message: 'Nutricionista eliminado' };
  }
}
