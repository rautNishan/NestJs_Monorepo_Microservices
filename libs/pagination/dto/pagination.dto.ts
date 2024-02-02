import { ApiHideProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiHideProperty()
  _search: Record<string, any>;
  @ApiHideProperty()
  _offset: number;
}
