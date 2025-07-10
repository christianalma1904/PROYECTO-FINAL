import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { NutricionistasService } from './nutricionistas.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateNutricionistaDto } from './dto/create-nutricionista.dto';

@Controller('nutricionistas')
export class NutricionistasController {
  constructor(private readonly nutricionistasService: NutricionistasService) {}

  @Get()
  findAll() {
    return this.nutricionistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutricionistasService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createNutricionistaDto: CreateNutricionistaDto) {
    return this.nutricionistasService.create(createNutricionistaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutricionistasService.remove(+id);
  }
}
