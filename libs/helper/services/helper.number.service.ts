import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperNumberService {
  create(number: string): number {
    return Number(number);
  }
}
