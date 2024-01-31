import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FacultyEntity } from 'libs/Entities/faculty/faculty.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { Model } from 'mongoose';

@Injectable()
export class FacultyRepository extends BaseRepository<FacultyEntity> {
  constructor(
    @InjectModel(FacultyEntity.name)
    private readonly facultyModel: Model<FacultyEntity>,
  ) {
    super(facultyModel);
  }

  create(data: any): Promise<any> {
    return this.facultyModel.create(data);
  }
  async find(query?: Record<string, any>) {
    try {
      let existingData;
      if (query) {
        existingData = await this.facultyModel.findOne(query);
        return existingData;
      }
      existingData = await this.facultyModel.find();
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
}
