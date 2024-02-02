// import { Inject, Injectable } from '@nestjs/common';
// import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
// import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
// import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { Model } from 'mongoose';

// @Injectable()
// export class TeacherRepository extends BaseRepository<TeacherEntity> {
//   constructor(@Inject('TeacherEntityModel') repository: Model<TeacherEntity>) {
//     super(repository);
//   }
// }
@Injectable()
export class TeacherRepository extends BaseRepository<TeacherEntity> {
  constructor(
    @InjectModel(TeacherEntity.name)
    private readonly teacherModel: Model<TeacherEntity>,
  ) {
    super(teacherModel);
  }

  async create(data: any): Promise<any> {
    return this.teacherModel.create(data);
  }

  async findOne(query?: Record<string, any>) {
    try {
      console.log('This is Query by id: ', query);
      const existingData = await this.teacherModel.findOne(query);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async findAll(query?: Record<string, any>) {
    try {
      const existingData = await this.teacherModel.find(query).limit(5);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
  async update(data: any) {
    try {
      const result = await this.teacherModel.findOneAndUpdate(
        { _id: data._id },
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.teacherModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
}
