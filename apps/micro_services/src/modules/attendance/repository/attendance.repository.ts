import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendanceEntity } from 'libs/Entities/attendance/attendance.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { PAGINATION_PER_PAGE } from 'libs/pagination/constants/pagination.constant';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceRepository extends BaseRepository<AttendanceEntity> {
  constructor(
    @InjectModel(AttendanceEntity.name)
    private readonly attendanceModel: Model<AttendanceEntity>,
  ) {
    super(attendanceModel);
  }

  async create(data: any) {
    return await this.attendanceModel.create(data);
  }

  async findMany(filter?: Record<string, any>, options?: Record<string, any>) {
    console.log('This is Filter and Options: ', filter, options);
    const { pageNumber } = options;
    const result = await this.attendanceModel
      .find(filter)
      .limit(PAGINATION_PER_PAGE)
      .skip(PAGINATION_PER_PAGE * (pageNumber - 1));
    return result;
  }

  async findUnlimited(filter?: Record<string, any>) {
    const result = await this.attendanceModel.find(filter);
    return result;
  }

  async findOne(query?: Record<string, any>) {
    try {
      const existingData = await this.attendanceModel.findOne(query);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async update(existingData: any) {
    try {
      const result = await this.attendanceModel.updateOne(
        { _id: existingData._id },
        existingData,
      );
      return result;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
}
