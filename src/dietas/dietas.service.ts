import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDietaDto } from './dto/create-dieta.dto';
// Si definiste DietaDocument en dieta.schema.ts, podrías importarlo para mejor tipado
// import { DietaDocument } from './dieta.schema';

@Injectable()
export class DietasService {
  // Es mejor tipar el modelo con DietaDocument si lo definiste en el esquema
  constructor(@InjectModel('Dieta') private dietaModel: Model<any>) {} // Cambia 'any' por 'DietaDocument' si lo importaste

  findAll() {
    // Esto devolverá todos los campos de la dieta, incluyendo los nuevos, si están en la BD.
    return this.dietaModel.find();
  }

  async findOne(id: string) {
    const doc = await this.dietaModel.findById(id);
    if (!doc) throw new NotFoundException('Dieta no encontrada');
    return doc;
  }

  create(data: CreateDietaDto) {
    // 'data' (CreateDietaDto) ahora incluye nombre, descripcion, fechaAsignacion
    // Mongoose los guardará si están en el esquema.
    const nueva = new this.dietaModel(data);
    return nueva.save();
  }

  async update(id: string, data: CreateDietaDto) {
    // 'data' (CreateDietaDto) ahora incluye nombre, descripcion, fechaAsignacion
    // Mongoose los actualizará si están en el esquema.
    const updated = await this.dietaModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Dieta no encontrada');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.dietaModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Dieta no encontrada');
    return { message: 'Dieta eliminada' };
  }
}