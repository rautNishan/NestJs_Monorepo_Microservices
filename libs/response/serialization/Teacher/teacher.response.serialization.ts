import { Exclude } from 'class-transformer';

export class TeacherResponseSerialization {
  _id: string;
  name: string;
  email: string;
  @Exclude()
  password: string;
  @Exclude()
  role: string;
  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  constructor(teacher: any) {
    this._id = teacher._id;
    this.name = teacher.name;
    this.email = teacher.email;
    this.password = teacher.password;
    this.role = teacher.role;
    this.createdAt = teacher.createdAt;
    this.updatedAt = teacher.updatedAt;
  }
}
