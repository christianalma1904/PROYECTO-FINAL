import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>,
    private jwtService: JwtService
  ) {}

  async register(dto: { nombre: string; email: string; password: string }) {
    const hash = await bcrypt.hash(dto.password, 10);
    const paciente = this.pacientesRepository.create({
      ...dto,
      password: hash,
    });
    await this.pacientesRepository.save(paciente);
    return { message: 'Paciente registrado correctamente' };
  }

  async login(dto: { email: string; password: string }) {
    const paciente = await this.pacientesRepository.findOneBy({ email: dto.email });
    if (!paciente) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(dto.password, paciente.password);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: paciente.id,
      role: paciente.rol,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
