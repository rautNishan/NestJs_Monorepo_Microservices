import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repository/admin.repository';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminModule: AdminRepository) {}

  async create(data: AdminDto): Promise<any> {
    try {
      const result = await this.adminModule.create(data);
      console.log('This is Result: ', result);
    } catch (error) {
      console.error('Error creating admin user: ', error);
    }
  }
}
