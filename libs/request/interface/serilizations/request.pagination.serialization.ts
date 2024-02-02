import { ApiProperty } from '@nestjs/swagger';

export class RequestPaginationSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    example: 'search',
  })
  search: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 1,
  })
  page: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: ['name'],
  })
  availableSearch: string[];
}
