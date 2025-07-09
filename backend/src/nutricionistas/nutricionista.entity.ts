import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Nutricionista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column()
  email: string;
}
