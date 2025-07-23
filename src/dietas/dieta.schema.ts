// src/dietas/dieta.schema.ts

import { Schema, Document } from 'mongoose'; // Importa Document

// 1. Define la interfaz Dieta que extiende Document de Mongoose
export interface Dieta extends Document {
  paciente_id: string;
  plan_id?: string; // Opcional
  semanas: {
    semana: number;
    menu: string[];
  }[];
  nombre?: string; // Opcional, según tu esquema
  descripcion?: string; // Opcional
  fechaAsignacion?: Date; // Opcional
}

// 2. Define tu esquema de Mongoose (esto ya lo tenías)
export const DietaSchema = new Schema<Dieta>({ // Añade <Dieta> para tipar el esquema
  paciente_id: { type: String, required: true },
  plan_id: { type: String, required: false },
  semanas: [
    {
      semana: { type: Number, required: true },
      menu: [{ type: String, required: true }],
    },
  ],
  nombre: { type: String, required: false },
  descripcion: { type: String, required: false },
  fechaAsignacion: { type: Date, required: false },
}, {
  timestamps: true
});