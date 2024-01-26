import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repository/student.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class StudentService {
  constructor(private readonly studentModel: StudentRepository) {}

  async registerStudent(data: any): Promise<any> {
    try {
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
