import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

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

  async create(data: CreatePagoDto) {
  const pago = this.pagosRepo.create({
    ...data,
    paciente: { id: data.paciente },
    plan: { id: data.plan },
  });
  return this.pagosRepo.save(pago);
}


  async remove(id: number) {
    const deleted = await this.pagosRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Pago no encontrado');
    return { message: 'Pago eliminado' };
  }
}
