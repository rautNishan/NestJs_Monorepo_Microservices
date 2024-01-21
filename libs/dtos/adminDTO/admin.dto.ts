import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
