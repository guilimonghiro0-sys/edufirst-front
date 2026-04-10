import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsIn(['MALE', 'FEMALE', 'OTHER'])
  gender: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  parentName: string;

  @IsEmail()
  parentEmail: string;

  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;
}
