import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private pacientesRepo: Repository<Paciente>,
  ) {}

  findAll() {
    return this.pacientesRepo.find();
  }

  findOne(id: number) {
    return this.pacientesRepo.findOneBy({ id });
  }

  async create(data: Partial<Paciente>) {
    const paciente = this.pacientesRepo.create(data);
    return this.pacientesRepo.save(paciente);
  }

  async update(id: number, data: Partial<Paciente>) {
    await this.pacientesRepo.update(id, data);
    const updated = await this.pacientesRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Paciente no encontrado');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.pacientesRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Paciente no encontrado');
    return { message: 'Paciente eliminado' };
  }
}
