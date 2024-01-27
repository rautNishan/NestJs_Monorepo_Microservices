import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repository/student.repository';
import * as bcrypt from 'bcrypt';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
@Injectable()
export class StudentService {
  constructor(private readonly studentModel: StudentRepository) {}

  async registerStudent(data: StudentCreateDto): Promise<any> {
    try {
      data.role = APP_USER_ROLES.STUDENT;
      data.password = await bcrypt.hash(data.password, 10);
      const result = await this.studentModel.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async find(query?: Record<string, any>) {
    try {
      const result = await this.studentModel.find(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
