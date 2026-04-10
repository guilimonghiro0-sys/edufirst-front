import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(@Query('schoolId') schoolId: string, @Query('skip') skip = '0', @Query('take') take = '100') {
    return this.studentsService.getAllBySchool(schoolId, Number(skip), Number(take));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentsService.getOne(id);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
}
