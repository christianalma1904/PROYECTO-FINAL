import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Plan } from '../planes/plan.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente)
  paciente: Paciente;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column('decimal')
  monto: number;

  // CAMBIO AQUÍ: Permitir valores nulos para la columna fecha
  @Column({ type: 'date', nullable: true })
  fecha: Date;
}