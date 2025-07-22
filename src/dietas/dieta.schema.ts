import { Schema } from 'mongoose';

export const DietaSchema = new Schema({
  paciente_id: { type: String, required: true }, // Asumo que paciente_id es siempre requerido
  plan_id: { type: String, required: false }, // Lo dejo como opcional, ajusta si es requerido
  semanas: [
    {
      semana: { type: Number, required: true }, // Asumo que semana es siempre requerido para cada entrada
      menu: [{ type: String, required: true }], // Asumo que cada entrada de menú es requerida
    },
  ],
  // ¡AÑADE ESTOS CAMPOS AQUÍ!
  nombre: { type: String, required: false }, // Añade 'required: true' si debe ser obligatorio al crear
  descripcion: { type: String, required: false }, // Añade 'required: true' si debe ser obligatorio
  fechaAsignacion: { type: Date, required: false }, // Usa Date para fechas. Añade 'required: true' si debe ser obligatorio
}, {
  timestamps: true // Esto añadirá `createdAt` y `updatedAt` automáticamente a tus documentos
});