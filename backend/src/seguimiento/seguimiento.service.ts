import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';

@Injectable()
export class SeguimientoService {
  constructor(@InjectModel('Seguimiento') private seguimientoModel: Model<any>) {}

  async findAll() {
    return this.seguimientoModel.find();
  }

  async findOne(id: string) {
    const doc = await this.seguimientoModel.findById(id);
    if (!doc) throw new NotFoundException('Seguimiento no encontrado');
    return doc;
  }

  create(data: CreateSeguimientoDto) {
    const nuevo = new this.seguimientoModel(data);
    return nuevo.save();
  }

  async remove(id: string) {
    const deleted = await this.seguimientoModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Seguimiento no encontrado');
    return { message: 'Seguimiento eliminado' };
  }
}
