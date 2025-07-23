import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DietasService } from './dietas.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

@Controller('dietas')
export class DietasController {
  constructor(private readonly dietasService: DietasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.dietasService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietasService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDietaDto: CreateDietaDto) {
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
