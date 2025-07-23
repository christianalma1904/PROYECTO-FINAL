import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

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
    // Solo permitir un admin
    if (data.rol === 'admin') {
      const existingAdmin = await this.pacientesRepo.findOneBy({ rol: 'admin' });
      if (existingAdmin) {
        throw new Error('Ya existe un usuario administrador');
      }
    }
    const paciente = this.pacientesRepo.create(data);
    return this.pacientesRepo.save(paciente);
  }

  async update(id: number, changes: UpdatePacienteDto) {
    const paciente = await this.pacientesRepo.findOneBy({ id });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');
    // Solo permitir un admin
    if (changes.rol === 'admin') {
      const existingAdmin = await this.pacientesRepo.findOneBy({ rol: 'admin' });
      if (existingAdmin && existingAdmin.id !== id) {
        throw new Error('Ya existe un usuario administrador');
      }
    }
    Object.assign(paciente, changes);
    return this.pacientesRepo.save(paciente);
  }

  async remove(id: number) {
    const deleted = await this.pacientesRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Paciente no encontrado');
    return { message: 'Paciente eliminado' };
  }
}
