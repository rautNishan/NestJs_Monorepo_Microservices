// import { Inject, Injectable } from '@nestjs/common';
// import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
// import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
// import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { PAGINATION_PER_PAGE } from 'libs/pagination/constants/pagination.constant';
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

  async findAll(options?: Record<string, any>) {
    try {
      console.log('This is Options: ', options);

      let { search_key, pageNumber } = options;
      search_key = { search_key: new RegExp(search_key, 'i') };
      pageNumber = PAGINATION_PER_PAGE * (pageNumber - 1);
      const totalCount = await this.teacherModel.countDocuments();
      console.log('This is Total Count: ', totalCount);
      const existingData = await this.teacherModel
        .find(search_key)
        .limit(PAGINATION_PER_PAGE)
        .skip(pageNumber);
      console.log('This is Existing Data: ', existingData);

      return { existingData, totalCount };
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
