import { ApiProperty } from '@nestjs/swagger';

export class TeacherCreateDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'Nishan Raut',
    description: 'Name of the Teacher',
  })
  name: string;
  @ApiProperty({
    required: true,
    type: String,
    example: 'donnishan0@gmail.com',
    description: 'Email of the Teacher',
  })
  email: string;
  @ApiProperty({
    required: true,
    type: String,
    example: '123456',
    description: 'Password of the Teacher',
  })
  password: string;
  //   @ApiProperty({
  //     required: false,
  //     type: String,
  //     example: APP_USER_ROLES.TEACHER,
  //     description: 'Role of the Teacher',
  //   })
  role: string;
}
