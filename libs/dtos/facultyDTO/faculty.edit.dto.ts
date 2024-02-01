import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FACULTY } from 'libs/constants/enums/faculty.enum';

export class FacultyEditDto {
  @ApiProperty({
    type: String,
    description: 'Faculty Id',
    example: '60e0a6e1e9d5f7c1b8e5d7a4',
    required: true,
  })
  id: string;
  @ApiProperty({
    type: String,
    description: 'Faculty Name',
    example: 'COMPUTING',
    required: true,
  })
  @IsEnum(FACULTY)
  name: string;
}
