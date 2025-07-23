import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';
import { Dieta } from './dieta.schema'; // Importa la interfaz Dieta si la tienes definida

@Injectable()
export class DietasService {
  constructor(@InjectModel('Dieta') private dietaModel: Model<Dieta>) {} // Usa Model<Dieta> si Dieta es tu interfaz/clase

  findAll() {
    return this.dietaModel.find().exec(); // .exec() asegura que devuelve una Promise
  }

  // Este método ya lo tenías, lo mantenemos igual
  async findByPacienteId(pacienteId: string): Promise<Dieta[]> {
    console.log(`[DietasService] Filtrando dietas por paciente_id: ${pacienteId}`);
    const dietas = await this.dietaModel.find({ paciente_id: pacienteId }).exec();
    return dietas;
  }

  async findOne(id: string): Promise<Dieta> {
    const doc = await this.dietaModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Dieta no encontrada');
    return doc;
  }

  create(data: CreateDietaDto): Promise<Dieta> {
    const nueva = new this.dietaModel(data);
    return nueva.save();
  }

  async update(id: string, data: UpdateDietaDto): Promise<Dieta> {
    const updated = await this.dietaModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Dieta no encontrada');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.dietaModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Dieta no encontrada');
    return { message: 'Dieta eliminada' };
  }
}