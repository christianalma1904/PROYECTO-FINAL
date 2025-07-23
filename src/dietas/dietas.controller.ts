import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DietasService } from './dietas.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';
import { Roles } from '../common/decorators/roles.decorator'; // Importa tu decorador Roles
import { RolesGuard } from '../common/guards/roles.guard';     // Importa tu RolesGuard
import { GetUser } from '../common/decorators/get-user.decorator'; // Importa tu GetUser decorator

@Controller('dietas')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Aplica AuthGuard y RolesGuard a nivel de controlador
export class DietasController {
  constructor(private readonly dietasService: DietasService) {}

  @Post()
  @Roles('admin', 'nutricionista') // Solo administradores y nutricionistas pueden crear dietas
  async create(@Body() createDietaDto: CreateDietaDto, @GetUser() user: { userId: string; role: string }) {
    // Opcional: Si un nutricionista solo puede asignar dietas a sus pacientes,
    // añadir lógica aquí para verificar que createDietaDto.paciente_id
    // esté entre los pacientes asignados al nutricionista.
    // Por ahora, solo permitimos que admin/nutricionista creen.
    return this.dietasService.create(createDietaDto);
  }

  @Get()
  @Roles('paciente', 'admin', 'nutricionista') // Pacientes, admins y nutricionistas pueden ver dietas
  async findAll(@GetUser() user: { userId: string; role: string }) {
    if (user.role === 'paciente') {
      // Si el usuario es un paciente, solo devuelve sus dietas
      return this.dietasService.findByPacienteId(user.userId);
    } else if (user.role === 'admin' || user.role === 'nutricionista') {
      // Si el usuario es un administrador o nutricionista, devuelve todas las dietas
      return this.dietasService.findAll();
    }
    // RolesGuard ya debería manejar roles no permitidos, pero es una salvaguarda.
    throw new ForbiddenException('Acceso no autorizado para este rol.');
  }

  @Get(':id')
  @Roles('paciente', 'admin', 'nutricionista') // Pacientes, admins y nutricionistas pueden ver una dieta específica
  async findOne(@Param('id') id: string, @GetUser() user: { userId: string; role: string }) {
    const dieta = await this.dietasService.findOne(id);

    if (!dieta) {
      throw new NotFoundException(`Dieta con ID ${id} no encontrada.`);
    }

    // Si el usuario es paciente, solo puede ver la dieta si está asignada a él
    if (user.role === 'paciente' && dieta.paciente_id !== user.userId) {
      throw new ForbiddenException('No tienes permiso para ver esta dieta.');
    }
    // Opcional: Si es nutricionista, verificar si la dieta pertenece a uno de sus pacientes.

    return dieta;
  }

  @Put(':id')
  @Roles('admin', 'nutricionista') // Solo administradores y nutricionistas pueden actualizar dietas
  update(@Param('id') id: string, @Body() updateDietaDto: UpdateDietaDto) {
    return this.dietasService.update(id, updateDietaDto);
  }

  @Delete(':id')
  @Roles('admin', 'nutricionista') // Solo administradores y nutricionistas pueden eliminar dietas
  remove(@Param('id') id: string) {
    return this.dietasService.remove(id);
  }
}