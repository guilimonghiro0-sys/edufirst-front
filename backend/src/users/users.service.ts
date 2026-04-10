import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        schoolId: data.schoolId,
      },
    });
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    const hashedRefresh = await bcrypt.hash(refreshToken, 12);
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hashedRefresh },
    });
  }
}
