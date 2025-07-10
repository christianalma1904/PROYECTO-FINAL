import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.seguimientoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguimientoService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSeguimientoDto: CreateSeguimientoDto) {
    return this.seguimientoService.create(createSeguimientoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguimientoService.remove(id);
  }
}
