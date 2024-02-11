import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
import { StudentRepository } from '../repository/student.repository';
import { HelperStringService } from 'libs/helper/services/helper.string.service';
@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly helperStringServiceString: HelperStringService,
  ) {}

  async registerStudent(data: any) {
    try {
      data.role = APP_USER_ROLES.STUDENT;
      data.password = await bcrypt.hash(data.password, 10);
      const search = this.helperStringServiceString.concat(
        data.email,
        data.college_id,
        data.name,
      );
      data.search_key = search;
      return await this.studentRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findOne(query?: Record<string, any>) {
    try {
      const result = await this.studentRepository.findOne(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: Record<string, any>) {
    try {
      // query = { search_key: new RegExp(query?.search_key, 'i') };
      const result = await this.studentRepository.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateStudentById(existingData, dataToUpdate) {
    try {
      if (dataToUpdate.hasOwnProperty('password')) {
        if (dataToUpdate.password != '') {
          dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
          existingData.password = dataToUpdate.password;
        }
      }
      if (dataToUpdate.hasOwnProperty('section')) {
        const length = existingData.section.length;
        existingData.section[length] = dataToUpdate.section;
      }
      if (dataToUpdate.hasOwnProperty('email')) {
        existingData.email = dataToUpdate.email;
      }
      if (dataToUpdate.hasOwnProperty('name')) {
        existingData.name = dataToUpdate.name;
      }
      if (dataToUpdate.hasOwnProperty('faculty')) {
        existingData.faculty = dataToUpdate.faculty;
      }
      const result = await this.studentRepository.update(existingData);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.studentRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAllAccordingToSection(options?: Record<string, any>) {
    try {
      const result =
        await this.studentRepository.findAllAccordingToSection(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteSectionFromStudent(id: string, query: Record<string, any>) {
    try {
      const result = await this.studentRepository.deleteSectionFromStudent(
        id,
        query,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMany(query: Record<string, any>, data: Record<string, any>) {
    try {
      const result = await this.studentRepository.updateMany(query, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async find(query?: Record<string, any>) {
    try {
      const result = await this.studentRepository.find(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findUnlimited(filter?: Record<string, any>) {
    try {
      const result = await this.studentRepository.findUnlimited(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
