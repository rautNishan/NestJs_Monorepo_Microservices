import { Injectable } from '@nestjs/common';
import {
  PAGINATION_MAX_PAGE,
  PAGINATION_PAGE,
  PAGINATION_MAX_PER_PAGE,
  PAGINATION_PER_PAGE,
} from '../constants/pagination.constant';

@Injectable()
export class PaginationService {
  search(searchValue = '', availableSearch = []): Record<string, any> {
    if (!searchValue) {
      return undefined;
    }

    return {
      $or: availableSearch.map((value) => ({
        [value]: {
          $regex: searchValue,
          $options: 'i',
        },
      })),
    };
  }

  page(page?: number): number {
    return page
      ? page > PAGINATION_MAX_PAGE
        ? PAGINATION_MAX_PAGE
        : page
      : PAGINATION_PAGE;
  }
  offset(page: number, perPage: number): number {
    page = page > PAGINATION_MAX_PAGE ? PAGINATION_MAX_PAGE : page;
    perPage = perPage > PAGINATION_MAX_PER_PAGE ? 100 : perPage;
    const offset: number = (page - 1) * perPage;

    return offset;
  }

  perPage(perPage?: number): number {
    return perPage
      ? perPage > PAGINATION_MAX_PER_PAGE
        ? PAGINATION_MAX_PER_PAGE
        : perPage
      : PAGINATION_PER_PAGE;
  }
}
