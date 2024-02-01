import { Injectable } from '@nestjs/common';
import { FacultyRepository } from '../repository/faculty.repository';

@Injectable()
export class FacultyService {
  constructor(private readonly facultyRepository: FacultyRepository) {}
  async create(data: any): Promise<any> {
    try {
      return await this.facultyRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async find(query?: Record<string, any>) {
    try {
      const result = await this.facultyRepository.find(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(existingData, data) {
    try {
      if (data.hasOwnProperty('name')) {
        existingData.name = data.name;
      }
      const result = await this.facultyRepository.update(existingData);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string) {
    try {
      const result = await this.facultyRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
