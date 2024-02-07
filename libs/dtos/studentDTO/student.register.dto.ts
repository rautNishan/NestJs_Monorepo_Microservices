import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { FACULTY } from 'libs/constants/enums/faculty.enum';

export class StudentCreateDto {
  @ApiProperty({
    description: 'Student name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    type: [String],
    example: ['N5'],
    description: 'Section of the Teacher',
  })
  section?: string[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'Student course',
    example: 'COMPUTING',
  })
  @IsEnum(FACULTY)
  faculty: FACULTY;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Student email',
    example: 'donnishan0@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Student password',
    example: '123456',
    required: true,
  })
  password: string;
}
