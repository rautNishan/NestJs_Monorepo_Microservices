import { Injectable } from '@nestjs/common';
import { SectionRepository } from '../repository/section.repository';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}
  async create(data: any): Promise<any> {
    try {
      return await this.sectionRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async find(query?: Record<string, any>, options?: any) {
    try {
      console.log('This is Query in section Service: ', query, options);
      const result = await this.sectionRepository.find(query, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: Record<string, any>) {
    try {
      // query = { search_key: new RegExp(query?.search_key, 'i') };
      const result = await this.sectionRepository.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.sectionRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(existingData, data?) {
    try {
      if (data) {
        if (data.hasOwnProperty('name')) {
          existingData.name = data.name;
        }
      }
      const result = await this.sectionRepository.update(existingData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
