import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentServiceService {
  getHello(): string {
    console.log('This is Get Hello');
    return 'Hello World!';
  }
}
