import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FACULTY } from 'libs/constants/enums/faculty.enum';

export class FacultyDto {
  @ApiProperty({
    description: 'Faculty name',
    example: 'COMPUTING',
    required: true,
  })
  @IsEnum(FACULTY)
  name: string;
}
