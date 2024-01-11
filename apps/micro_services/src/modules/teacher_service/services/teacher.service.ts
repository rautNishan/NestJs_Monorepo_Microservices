import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../repository/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}
  registerStudent(data: any) {
    console.log('This is Data in Service: ', data);
    return this.teacherRepository.create(data);
  }
}
