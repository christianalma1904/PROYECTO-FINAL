import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'paciente' })
  rol: string;
}
