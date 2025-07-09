import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { NutricionistasService } from './nutricionistas.service';
import { AuthGuard } from '@nestjs/passport';

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
  create(@Body() data) {
    return this.nutricionistasService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.nutricionistasService.update(+id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutricionistasService.remove(+id);
  }
}
