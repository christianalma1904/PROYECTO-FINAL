import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';

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

  async create(data: CreatePacienteDto) {
    const paciente = this.pacientesRepo.create(data);
    return this.pacientesRepo.save(paciente);
  }

  async remove(id: number) {
    const deleted = await this.pacientesRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Paciente no encontrado');
    return { message: 'Paciente eliminado' };
  }
}
