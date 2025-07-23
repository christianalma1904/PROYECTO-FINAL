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

  // **** NUEVO MÉTODO PARA FILTRAR POR ID DE PACIENTE ****
  async findPagosByPacienteId(pacienteId: number): Promise<Pago[]> {
    return this.pagosRepo.find({
      // Usamos 'paciente.id' porque 'paciente' es una relación a la entidad Paciente
      // y estamos buscando por su ID.
      where: { paciente: { id: pacienteId } },
      relations: ['paciente', 'plan'], // Asegúrate de cargar las relaciones también aquí
    });
  }

  findOne(id: number) {
    return this.pagosRepo.findOne({
      where: { id },
      relations: ['paciente', 'plan'],
    });
  }

  async create(data: CreatePagoDto) {
    // Cuando creamos, asignamos los IDs de paciente y plan a objetos parciales
    // que TypeORM puede usar para establecer las relaciones.
    const pago = this.pagosRepo.create({
      monto: data.monto,
      fecha: new Date(data.fecha), // Convertir a Date si la entidad espera un objeto Date
      paciente: { id: data.paciente } as any, // Asume data.paciente es el ID del paciente
      plan: { id: data.plan } as any,         // Asume data.plan es el ID del plan
    });
    return this.pagosRepo.save(pago);
  }

  async update(id: number, data: UpdatePagoDto) {
    const pagoActual = await this.pagosRepo.findOne({
      where: { id },
      relations: ['paciente', 'plan'], // Cargar relaciones para asegurar que estén presentes si se necesitan
    });
    if (!pagoActual) throw new NotFoundException('Pago no encontrado');

    // Actualizamos las propiedades individualmente
    if (data.monto !== undefined) pagoActual.monto = data.monto;
    if (data.fecha) pagoActual.fecha = new Date(data.fecha);

    // Si data.paciente o data.plan se envían, actualizamos la relación
    if (data.paciente !== undefined) {
      pagoActual.paciente = { id: data.paciente } as any;
    }
    if (data.plan !== undefined) {
      pagoActual.plan = { id: data.plan } as any;
    }

    await this.pagosRepo.save(pagoActual);

    // Volvemos a buscar el pago completo con las relaciones actualizadas para devolverlo
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