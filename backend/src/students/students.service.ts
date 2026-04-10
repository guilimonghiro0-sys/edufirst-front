import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBySchool(schoolId: string, skip = 0, take = 100) {
    return this.prisma.student.findMany({
      where: { schoolId },
      orderBy: { lastName: 'asc' },
      skip,
      take,
    });
  }

  async getOne(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async create(data: CreateStudentDto) {
    return this.prisma.student.create({ data });
  }
}
