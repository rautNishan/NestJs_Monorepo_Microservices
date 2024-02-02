import { Injectable, Inject, PipeTransform, Scope, Type } from '@nestjs/common';
import { IRequestApp } from 'libs/request/interface/request.interface';
import { REQUEST } from '@nestjs/core';
import { PaginationService } from '../service/pagination.service';

export function PaginationSearchPipe(
  availableSearch: string[],
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationSearchPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: IRequestApp,
      private readonly paginationService: PaginationService,
    ) {}

    async transform(value: Record<string, any>): Promise<Record<string, any>> {
      const searchText = value?.search ?? '';
      const search: Record<string, any> = this.paginationService.search(
        value?._search,
        availableSearch,
      );
      this.request.__pagination = {
        ...this.request.__pagination,
        search: searchText,
        availableSearch,
      };
      return {
        ...value,
        _search: search,
        _availableSearch: availableSearch,
      };
    }
  }
  return MixinPaginationSearchPipe;
}
