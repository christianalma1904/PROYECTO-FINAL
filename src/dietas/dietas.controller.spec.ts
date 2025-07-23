import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common'; // Importa Query
import { DietasService } from './dietas.service';
import { AuthGuard } from '@nestjs/passport'; // Este es el AuthGuard de Passport
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

// Si usas RolesGuard y Roles Decorator, asegúrate de que estén importados:
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Si AuthGuard('jwt') es tu JwtAuthGuard
// import { RolesGuard } from '../common/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
// import { Role } from '../common/enums/role.enum'; // Si tienes un enum de roles

@Controller('dietas')
export class DietasController {
  constructor(private readonly dietasService: DietasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get() // Este endpoint ahora puede recibir un query parameter 'paciente_id'
  findAll(@Query('paciente_id') pacienteId?: string) { // <-- ¡Añade @Query('paciente_id')!
    if (pacienteId) {
      console.log(`[DietasController] Buscando dietas para paciente_id: ${pacienteId}`);
      return this.dietasService.findByPacienteId(pacienteId); // Llama al nuevo método del servicio
    }
    // Si no se proporciona paciente_id, puedes decidir qué hacer:
    // 1. Devolver todas las dietas (solo si el rol lo permite, ej. Admin/Nutricionista)
    // 2. Lanzar un error si siempre se espera un paciente_id
    // 3. O, si es un paciente, podrías obtener el ID del usuario autenticado desde el token
    //    y usarlo como filtro por defecto si no se pasa paciente_id explícitamente.
    //    Para el dashboard del paciente, tu frontend ya envía el ID, así que esto es menos crítico.
    console.log("[DietasController] Obteniendo todas las dietas (sin filtro de paciente_id en la URL).");
    return this.dietasService.findAll(); // Devuelve todas si no hay filtro de query
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietasService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDietaDto: CreateDietaDto) {
    // Cuando creas una dieta, asegúrate de que 'paciente_id' esté en el DTO
    // y sea el ID del paciente al que se le asigna la dieta.
    return this.dietasService.create(createDietaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDietaDto: UpdateDietaDto) {
    return this.dietasService.update(id, updateDietaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietasService.remove(id);
  }
}