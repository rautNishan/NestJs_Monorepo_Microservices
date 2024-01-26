import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentEntity } from 'libs/Entities/student/student.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { Model } from 'mongoose';

@Injectable()
export class StudentRepository extends BaseRepository<StudentEntity> {
  constructor(
    @InjectModel(StudentEntity.name)
    private readonly studentModel: Model<StudentEntity>,
  ) {
    super(studentModel);
  }
  async create(data: any): Promise<any> {
    return await this.studentModel.create(data);
  }
  async find(query?: Record<string, any>) {
    if (!query) {
      const result = await this.studentModel.findOne();
      return result;
    }
    const result = await this.studentModel.findOne(query);
    return result;
  }
}
