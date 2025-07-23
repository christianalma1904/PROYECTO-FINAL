import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

@Injectable()
export class DietasService {
  constructor(@InjectModel('Dieta') private dietaModel: Model<any>) {} // 'any' es un placeholder, usa tu interfaz de Dieta de Mongoose si la tienes

  findAll() {
    return this.dietaModel.find(); // Este sigue devolviendo todas si no se llama con filtro
  }

  // Nuevo método para encontrar dietas por paciente_id
  async findByPacienteId(pacienteId: string) {
    // Asume que tu esquema de Dieta en Mongoose tiene un campo llamado 'paciente_id'
    // que almacena el ID del paciente.
    console.log(`[DietasService] Filtrando dietas por paciente_id: ${pacienteId}`);
    const dietas = await this.dietaModel.find({ paciente_id: pacienteId }).exec(); // <-- ¡FILTRADO CRUCIAL AQUÍ!
    return dietas;
  }

  async findOne(id: string) {
    const doc = await this.dietaModel.findById(id);
    if (!doc) throw new NotFoundException('Dieta no encontrada');
    return doc;
  }

  create(data: CreateDietaDto) {
    const nueva = new this.dietaModel(data);
    return nueva.save();
  }

  async update(id: string, data: UpdateDietaDto) {
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