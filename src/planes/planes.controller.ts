import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('planes')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Post()
  @Roles('admin')
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planesService.create(createPlanDto);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planesService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.planesService.remove(+id);
  }
}
