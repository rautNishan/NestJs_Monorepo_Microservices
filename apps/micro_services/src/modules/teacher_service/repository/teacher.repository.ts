// import { Inject, Injectable } from '@nestjs/common';
// import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
// import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
// import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherEntity } from 'libs/Entities/teacher/teacher.entity';
import { BaseRepository } from 'libs/database/repository/base.repository.abstract';
import { Model } from 'mongoose';

// @Injectable()
// export class TeacherRepository extends BaseRepository<TeacherEntity> {
//   constructor(@Inject('TeacherEntityModel') repository: Model<TeacherEntity>) {
//     super(repository);
//   }
// }
@Injectable()
export class TeacherRepository extends BaseRepository<TeacherEntity> {
  constructor(
    @InjectModel(TeacherEntity.name)
    private readonly teacherModel: Model<TeacherEntity>,
  ) {
    super(teacherModel);
  }

  async create(data: any): Promise<any> {
    return await this.teacherModel.create(data);
  }
}
