import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperObjectService {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}
