import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminEntity } from 'libs/Entities/admin/admin.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { Model } from 'mongoose';

@Injectable()
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(
    @InjectModel(AdminEntity.name)
    private readonly adminModel: Model<AdminEntity>,
  ) {
    super(adminModel);
  }
  async create(data: any): Promise<any> {
    await this.adminModel.create(data);
  }
  async find(user?: string) {
    if (!user) {
      const result = await this.adminModel.findOne();
      return result;
    }
    const result = await this.adminModel.findOne({ username: user });
    return result;
  }
}
