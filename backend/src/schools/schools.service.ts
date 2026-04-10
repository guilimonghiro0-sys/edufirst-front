import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.school.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getOne(id: string) {
    return this.prisma.school.findUnique({ where: { id } });
  }

  async create(data: CreateSchoolDto) {
    return this.prisma.school.create({ data });
  }
}
