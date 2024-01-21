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
    console.log('This is Data: ', data);
    const result = await this.adminModel.create(data);
    console.log('This is Reuslt: ', result);
  }
  async find() {
    const result = await this.adminModel.findOne({});
    return result;
  }
}
