import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

@Injectable()
export class DietasService {
  constructor(@InjectModel('Dieta') private dietaModel: Model<any>) {}

  findAll() {
    return this.dietaModel.find();
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
