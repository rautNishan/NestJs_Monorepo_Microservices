import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'libs/authentication/services/authentication.service';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminModule: AdminRepository,
    private readonly authService: AuthenticationService,
  ) {}

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

  async login(data: any, existingAdmin: any): Promise<any> {
    try {
      const isAuthenticated = await this.authService.checkAuthentication(
        data,
        existingAdmin,
      );
      console.log('This is Authenticated: ', isAuthenticated);
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
