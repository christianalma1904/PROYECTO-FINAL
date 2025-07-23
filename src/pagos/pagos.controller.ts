import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Roles } from '../common/decorators/roles.decorator'; // Importa tu decorador Roles
import { RolesGuard } from '../common/guards/roles.guard';     // Importa tu RolesGuard
import { GetUser } from '../common/decorators/get-user.decorator'; // Importa tu GetUser decorator

@Controller('pagos')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Aplica AuthGuard y RolesGuard a nivel de controlador
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @Roles('paciente', 'admin') // Permite a pacientes y administradores crear pagos
  async create(@Body() createPagoDto: CreatePagoDto, @GetUser() user: { userId: number; role: string }) {
    // Si el usuario es paciente, DEBE ser su propio ID de paciente en el DTO
    // user.userId viene del payload.sub de tu JwtStrategy
    if (user.role === 'paciente' && user.userId !== createPagoDto.paciente) {
      throw new ForbiddenException('Un paciente solo puede registrar pagos para sí mismo.');
    }
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  @Roles('paciente', 'admin') // Pacientes y administradores pueden ver los pagos
  async findAll(@GetUser() user: { userId: number; role: string }) {
    // user.role viene del payload.role de tu JwtStrategy
    if (user.role === 'paciente') {
      // Si el usuario es un paciente, solo devuelve sus pagos
      return this.pagosService.findPagosByPacienteId(user.userId);
    } else if (user.role === 'admin') {
      // Si el usuario es un administrador, devuelve todos los pagos
      return this.pagosService.findAll();
    }
    // Aunque RolesGuard ya debería evitar que lleguemos aquí con roles no permitidos,
    // es una buena práctica añadir una capa de seguridad explícita.
    throw new ForbiddenException('Acceso no autorizado para este rol.');
  }

  @Get(':id')
  @Roles('paciente', 'admin') // Pacientes y administradores pueden ver un pago específico
  async findOne(@Param('id') id: string, @GetUser() user: { userId: number; role: string }) {
    const pago = await this.pagosService.findOne(+id);

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado.`);
    }

    // Si el usuario es paciente, solo puede ver el pago si el paciente asociado es él mismo
    // Aquí asumimos que pago.paciente es un objeto con un 'id' (relación cargada)
    if (user.role === 'paciente' && pago.paciente.id !== user.userId) {
      throw new ForbiddenException('No tienes permiso para ver este pago.');
    }
    return pago;
  }

  @Put(':id')
  @Roles('admin') // Solo administradores pueden actualizar pagos
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  @Roles('admin') // Solo administradores pueden eliminar pagos
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}