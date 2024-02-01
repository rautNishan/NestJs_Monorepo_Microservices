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

  async find(query?: Record<string, any>) {
    try {
      let existingData;
      if (query) {
        existingData = await this.teacherModel.findOne(query);
      } else {
        existingData = await this.teacherModel.find();
      }
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
