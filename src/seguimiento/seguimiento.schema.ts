import { Schema } from 'mongoose';

export const SeguimientoSchema = new Schema({
  paciente_id: String,
  semana: Number,
  peso: Number,
  medidas: {
    cintura: Number,
    cadera: Number,
  },
  fotos: [String],
  fecha: Date,
});
