import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SectionEntity } from 'libs/Entities/section/section.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { PAGINATION_PER_PAGE } from 'libs/pagination/constants/pagination.constant';
import { Model } from 'mongoose';

@Injectable()
export class SectionRepository extends BaseRepository<SectionEntity> {
  constructor(
    @InjectModel(SectionEntity.name)
    private readonly sectionModel: Model<SectionEntity>,
  ) {
    super(sectionModel);
  }

  async create(data: any): Promise<any> {
    return this.sectionModel.create(data);
  }

  async find(query?: Record<string, any>, options?: any) {
    try {
      let existingData;
      if (query) {
        existingData = await this.sectionModel.findOne(query, options);
        return existingData;
      }
      existingData = await this.sectionModel.find(options);
      return existingData;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async findAll(options?: Record<string, any>) {
    try {
      let { section, pageNumber } = options;
      section = { section: new RegExp(section, 'i') };
      pageNumber = PAGINATION_PER_PAGE * (pageNumber - 1);
      const totalCount = await this.sectionModel.countDocuments();
      const existingData = await this.sectionModel
        .find(section)
        .limit(PAGINATION_PER_PAGE)
        .skip(pageNumber);
      return { existingData, totalCount };
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.sectionModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log('This is Error in Repository: ', error);
      throw error;
    }
  }
  async update(data: any): Promise<any> {
    const { _id, ...updateData } = data;
    const result = await this.sectionModel.findOneAndUpdate(
      { _id: _id },
      updateData,
    );
    return result;
  }
}
