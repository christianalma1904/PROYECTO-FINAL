import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Get()
  findAll() {
    return this.planesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planesService.create(createPlanDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planesService.remove(+id);
  }
}
