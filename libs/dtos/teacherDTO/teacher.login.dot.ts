import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TeacherLoginDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'donnishan0@gmail.com',
    description: 'Email of the Teacher',
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    required: true,
    type: String,
    example: '123456',
    description: 'Password of the Teacher',
  })
  @IsNotEmpty()
  password: string;
}
