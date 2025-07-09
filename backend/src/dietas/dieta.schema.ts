import { Schema } from 'mongoose';

export const DietaSchema = new Schema({
  paciente_id: String,
  plan_id: String,
  semanas: [
    {
      semana: Number,
      menu: [String],
    },
  ],
});
