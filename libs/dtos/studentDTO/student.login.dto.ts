import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
