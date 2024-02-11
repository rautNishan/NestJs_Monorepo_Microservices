import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from '../repository/attendance.repository';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}
  async createAttendance(attendance: any) {
    try {
      return this.attendanceRepository.create(attendance);
    } catch (error) {
      throw error;
    }
  }

  async findMany(filter?: Record<string, any>, options?: Record<string, any>) {
    try {
      const result = await this.attendanceRepository.findMany(filter, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findUnlimited(filter?: Record<string, any>) {
    try {
      const result = await this.attendanceRepository.findUnlimited(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(query?: Record<string, any>) {
    try {
      const result = await this.attendanceRepository.findOne(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateAttendance(existingData: any) {
    try {
      const result = await this.attendanceRepository.update(existingData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
