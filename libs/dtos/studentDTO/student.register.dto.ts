import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentRegisterDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  section: string;
  @IsNotEmpty()
  course: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
