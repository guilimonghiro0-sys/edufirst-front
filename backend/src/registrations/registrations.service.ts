import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationStatusDto } from './dto/update-registration-status.dto';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRegistrationDto) {
    return this.prisma.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        birthDate: new Date(data.birthDate),
        parentName: data.parentName,
        parentEmail: data.parentEmail,
        schoolId: data.schoolId,
        relationship: data.relationship,
      },
    });
  }

  async findAll(schoolId?: string, status?: string) {
    const where: any = {};
    if (schoolId) where.schoolId = schoolId;
    if (status) where.status = status;

    return this.prisma.registration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { school: true },
    });
  }

  async findOne(id: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { id },
    });
    if (!registration) {
      throw new NotFoundException('Inscription introuvable');
    }
    return registration;
  }

  async updateStatus(id: string, data: UpdateRegistrationStatusDto) {
    const registration = await this.findOne(id);

    if (registration.status === data.status) {
      return registration;
    }

    const updated = await this.prisma.registration.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
      },
    });

    if (data.status === 'APPROVED' && !registration.studentId) {
      const student = await this.prisma.student.create({
        data: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          birthDate: registration.birthDate,
          gender: registration.gender,
          schoolId: registration.schoolId,
        },
      });
      return this.prisma.registration.update({
        where: { id },
        data: { studentId: student.id },
      });
    }

    return updated;
  }
}
