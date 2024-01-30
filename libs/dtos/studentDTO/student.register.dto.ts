import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { COURSES } from 'libs/constants/enums/course.enum';
import { SECTION } from 'libs/constants/enums/section.enum';

export class StudentCreateDto {
  @ApiProperty({
    description: 'Student name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Student section',
    example: 'N5',
  })
  @IsNotEmpty()
  @IsEnum(SECTION)
  section: SECTION;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Student course',
    example: 'COMPUTING',
  })
  @IsEnum(COURSES)
  course: COURSES;
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
