import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import { FACULTY } from 'libs/constants/enums/faculty.enum';

export class TeacherCreateDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '001',
    description: 'College ID of the Teacher',
  })
  college_id: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Nishan Raut',
    description: 'Name of the Teacher',
  })
  name: string;

  @ApiProperty({
    required: false,
    type: [String],
    example: ['N5'],
    description: 'Section of the Teacher',
  })
  section?: string[];

  @ApiProperty({
    required: true,
    type: String,
    example: 'donnishan0@gmail.com',
    description: 'Email of the Teacher',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '123456',
    description: 'Password of the Teacher',
  })
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'COMPUTING',
    description: 'Faculty of the Teacher',
  })
  @IsEnum(FACULTY)
  faculty: string;
  //   @ApiProperty({
  //     required: false,
  //     type: String,
  //     example: APP_USER_ROLES.TEACHER,
  //     description: 'Role of the Teacher',
  //   })
  role: string;
}
