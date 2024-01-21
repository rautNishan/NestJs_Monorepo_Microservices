import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repository/admin.repository';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly adminModule: AdminRepository) {}

  async create(data: AdminDto): Promise<any> {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const result = await this.adminModule.create(data);
      console.log('This is Result: ', result);
    } catch (error) {
      console.error('Error creating admin user: ', error);
    }
  }

  async find() {
    const result = await this.adminModule.find();
    return result;
  }
}
