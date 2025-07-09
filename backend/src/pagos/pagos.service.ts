import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagosRepo: Repository<Pago>,
  ) {}

  findAll() {
    return this.pagosRepo.find({
      relations: ['paciente', 'plan'],
    });
  }

  findOne(id: number) {
    return this.pagosRepo.findOne({
      where: { id },
      relations: ['paciente', 'plan'],
    });
  }

  async create(data: Partial<Pago>) {
    const pago = this.pagosRepo.create(data);
    return this.pagosRepo.save(pago);
  }

  async update(id: number, data: Partial<Pago>) {
    await this.pagosRepo.update(id, data);
    const updated = await this.pagosRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException('Pago no encontrado');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.pagosRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Pago no encontrado');
    return { message: 'Pago eliminado' };
  }
}
