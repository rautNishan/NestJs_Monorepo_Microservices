import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
  @ApiProperty({ example: 'admin@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
