import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRegistrationStatusDto {
  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
