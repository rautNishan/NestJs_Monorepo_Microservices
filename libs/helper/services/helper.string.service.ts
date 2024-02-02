import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperStringService {
  concat(...args: string[]): string {
    console.log('This is Args: ', args);
    return args.join(' | ');
  }
}
