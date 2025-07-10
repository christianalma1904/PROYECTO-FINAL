import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

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

  async update(id: number, data: UpdatePagoDto) {
    const pagoActual = await this.pagosRepo.findOne({
      where: { id },
      relations: ['paciente', 'plan'],
    });
    if (!pagoActual) throw new NotFoundException('Pago no encontrado');

    if (data.paciente) pagoActual.paciente = { id: data.paciente } as any;
    if (data.plan) pagoActual.plan = { id: data.plan } as any;
    if (data.monto !== undefined) pagoActual.monto = data.monto;
    if (data.fecha) pagoActual.fecha = new Date(data.fecha);

    await this.pagosRepo.save(pagoActual);
    return this.pagosRepo.findOne({
      where: { id },
      relations: ['paciente', 'plan'],
    });
  }

  async remove(id: number) {
    const deleted = await this.pagosRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException('Pago no encontrado');
    return { message: 'Pago eliminado' };
  }
}
