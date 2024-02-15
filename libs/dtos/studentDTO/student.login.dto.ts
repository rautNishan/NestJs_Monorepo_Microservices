import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentLoginDto {
  @ApiProperty({
    description: 'Email of the student',
    example: 'donnishan0@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Password of the student',
    example: 'donnishan0@',
  })
  @IsNotEmpty()
  password: string;
}
