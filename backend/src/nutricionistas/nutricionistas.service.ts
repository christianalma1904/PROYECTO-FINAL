import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutricionista } from './nutricionista.entity';
import { CreateNutricionistaDto } from './dto/create-nutricionista.dto';

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

  async create(data: CreateNutricionistaDto) {
    const nutri = this.nutricionistasRepo.create(data);
    return this.nutricionistasRepo.save(nutri);
  }

  async remove(id: number) {
    const deleted = await this.nutricionistasRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Nutricionista no encontrado');
    return { message: 'Nutricionista eliminado' };
  }
}
