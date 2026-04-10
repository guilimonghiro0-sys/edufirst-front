import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  async findAll() {
    return this.schoolsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.schoolsService.getOne(id);
  }

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }
}
