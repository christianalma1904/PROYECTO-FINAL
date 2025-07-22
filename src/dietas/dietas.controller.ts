import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DietasService } from './dietas.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDietaDto } from './dto/create-dieta.dto';

@Controller('dietas')
export class DietasController {
  constructor(private readonly dietasService: DietasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    // Este método ahora devolverá los campos nombre, descripcion, fechaAsignacion
    // si están en el esquema y en la base de datos.
    return this.dietasService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Este método ahora devolverá los campos nombre, descripcion, fechaAsignacion
    // si están en el esquema y en la base de datos.
    return this.dietasService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDietaDto: CreateDietaDto) {
    // createDietaDto ahora incluye nombre, descripcion, fechaAsignacion
    // El servicio los recibirá y los pasará al modelo para guardar.
    return this.dietasService.create(createDietaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDietaDto: CreateDietaDto) {
    // updateDietaDto ahora incluye nombre, descripcion, fechaAsignacion
    // El servicio los recibirá y los pasará al modelo para actualizar.
    return this.dietasService.update(id, updateDietaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietasService.remove(id);
  }
}