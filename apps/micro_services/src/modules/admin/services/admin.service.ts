import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'libs/authentication/services/authentication.service';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly authService: AuthenticationService,
  ) {}

  async create(data: AdminDto): Promise<any> {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      await this.adminRepo.create(data);
    } catch (error) {
      console.error('Error creating admin user: ', error);
    }
  }

  async find(query?: Record<string, any>) {
    const result = await this.adminRepo.find(query);
    return result;
  }

  async login(data: any, existingAdmin: any): Promise<any> {
    try {
      const isAuthenticated = await this.authService.checkAuthentication(
        data,
        existingAdmin,
      );
      return isAuthenticated;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
