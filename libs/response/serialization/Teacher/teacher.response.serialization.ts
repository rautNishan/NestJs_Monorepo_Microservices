import { Exclude } from 'class-transformer';

export class TeacherResponseSerialization {
  _id: string;
  name: string;
  email: string;
  faculty: string;
  college_id: string;
  section: string[];
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
    this.faculty = teacher.faculty;
    this.password = teacher.password;
    this.role = teacher.role;
    this.createdAt = teacher.createdAt;
    this.updatedAt = teacher.updatedAt;
    this.college_id = teacher.college_id;
    this.section = teacher.section;
  }
}
