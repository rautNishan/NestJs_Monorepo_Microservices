import { PaginationPagingPipe } from '../pipes/pagination.paging.pipe';
import { PaginationSearchPipe } from '../pipes/pagination.search.pipe';
import { Query } from '@nestjs/common';
export function PaginationQuery(
  defaultPerPage: number,
  availableSearch: string[],
): ParameterDecorator {
  return Query(
    PaginationSearchPipe(availableSearch),
    PaginationPagingPipe(defaultPerPage),
  );
}
