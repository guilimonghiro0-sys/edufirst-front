import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  schoolId: string;
}
