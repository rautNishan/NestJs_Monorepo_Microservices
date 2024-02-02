import { Inject, Injectable, PipeTransform, Scope, Type } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HelperNumberService } from 'libs/helper/services/helper.number.service';
import { IRequestApp } from 'libs/request/interface/request.interface';
import { PaginationService } from '../service/pagination.service';

export function PaginationPagingPipe(
  defaultPerPage: number,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationPagingPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: IRequestApp,
      private readonly paginationService: PaginationService,
      private readonly helperNumberService: HelperNumberService,
    ) {}
    async transform(value: Record<string, any>): Promise<Record<string, any>> {
      const page = this.helperNumberService.create(value?.page ?? 1);
      const perPage = this.helperNumberService.create(
        value?.perPage ?? defaultPerPage,
      );
      this.request.__pagination = {
        ...this.request.__pagination,
        page,
        perPage,
      };
      return {
        ...value,
        page: this.paginationService.page(page),
        perPage: this.paginationService.perPage(perPage),
      };
    }
  }
  return MixinPaginationPagingPipe;
}
