import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
  constructor() {}
  registerStudent(data: any) {
    console.log('This is Data in Service: ', data);
  }
}
