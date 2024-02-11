import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentEntity } from 'libs/Entities/student/student.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { PAGINATION_PER_PAGE } from 'libs/pagination/constants/pagination.constant';
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
    let result;
    if (query) {
      result = await this.studentModel.findOne(query);
      return result;
    }
    result = await this.studentModel.find();
    return result;
  }

  async findOne(query?: Record<string, any>) {
    try {
      const existingData = await this.studentModel.findOne(query);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async findAll(options?: Record<string, any>) {
    try {
      let { search_key, pageNumber } = options;
      search_key = { search_key: new RegExp(search_key, 'i') };
      pageNumber = PAGINATION_PER_PAGE * (pageNumber - 1);
      const totalCount = await this.studentModel.countDocuments();
      const existingData = await this.studentModel
        .find(search_key)
        .limit(PAGINATION_PER_PAGE)
        .skip(pageNumber);

      return { existingData, totalCount };
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async update(data: any) {
    try {
      const result = await this.studentModel.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true }, //This will return new updated Data, (note: this is used to update Faculty also so returning update is necessary)
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.studentModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
  async findAllAccordingToSection(options?: Record<string, any>) {
    try {
      let { search_key, pageNumber } = options;
      const { section } = options;
      search_key = { search_key: new RegExp(search_key, 'i'), section };
      pageNumber = PAGINATION_PER_PAGE * (pageNumber - 1);
      const existingData = await this.studentModel
        .find(search_key)
        .limit(PAGINATION_PER_PAGE)
        .skip(pageNumber);
      const totalCount = await this.studentModel.countDocuments(search_key);

      return { existingData, totalCount };
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async deleteSectionFromStudent(id: string, query: Record<string, any>) {
    try {
      const result = await this.studentModel.updateOne(
        { _id: id },
        { $pull: query },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMany(query: Record<string, any>, data: Record<string, any>) {
    try {
      const result = await this.studentModel.updateMany(query, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findMany(filter?: Record<string, any>, options?: Record<string, any>) {
    console.log('This is Filter and Options: ', filter, options);
    const { pageNumber } = options;
    const result = await this.studentModel
      .find(filter)
      .limit(PAGINATION_PER_PAGE)
      .skip(PAGINATION_PER_PAGE * (pageNumber - 1));
    return result;
  }

  async findUnlimited(filter?: Record<string, any>) {
    const result = await this.studentModel.find(filter);
    return result;
  }
}
