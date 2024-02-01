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
  async find(query?: Record<string, any>, options?: any) {
    try {
      let existingData;
      if (query) {
        existingData = await this.facultyModel.findOne(query, options);
        return existingData;
      }
      existingData = await this.facultyModel.find(options);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async update(data: any): Promise<any> {
    const { _id, ...updateData } = data;
    const result = await this.facultyModel.findOneAndUpdate(
      { _id: _id },
      updateData,
    );
    return result;
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.facultyModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
}
