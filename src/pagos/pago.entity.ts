import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Plan } from '../planes/plan.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente, paciente => paciente.id)
  paciente: Paciente;

  @ManyToOne(() => Plan, plan => plan.id)
  plan: Plan;

  @Column('decimal')
  monto: number;

  @Column()
  fecha: Date;
}
