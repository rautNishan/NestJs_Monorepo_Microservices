import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SectionCreateDto {
  @ApiProperty({
    description: 'Section name',
    example: 'N5',
  })
  @IsNotEmpty()
  section: string;
}
