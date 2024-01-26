import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentCreateDto {
  @ApiProperty({
    description: 'Student name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Student section',
    example: 'A',
  })
  @IsNotEmpty()
  section: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Student course',
    example: 'BSCS',
  })
  course: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Student email',
    example: 'donnishan0@gmail.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Student password',
    example: '123456',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Student role',
    example: 'STUDENT',
  })
  role: string;
}
