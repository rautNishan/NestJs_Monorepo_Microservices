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
      await this.adminModule.create(data);
    } catch (error) {
      console.error('Error creating admin user: ', error);
    }
  }

  async find(username?: string) {
    console.log('This is User: ', username);
    const result = await this.adminModule.find(username);
    return result;
  }
  // async login(data: any) {

  // }
}
