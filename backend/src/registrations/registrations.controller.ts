import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationStatusDto } from './dto/update-registration-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHOOL_ADMIN')
  @Get()
  async findAll(@Query('schoolId') schoolId?: string, @Query('status') status?: string) {
    return this.registrationsService.findAll(schoolId, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHOOL_ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHOOL_ADMIN')
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateRegistrationStatusDto: UpdateRegistrationStatusDto) {
    return this.registrationsService.updateStatus(id, updateRegistrationStatusDto);
  }
}
