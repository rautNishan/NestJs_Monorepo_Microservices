import { Exclude } from 'class-transformer';

export class StudentResponseSerialization {
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
  constructor(student: any) {
    this._id = student._id;
    this.name = student.name;
    this.email = student.email;
    this.faculty = student.faculty;
    this.password = student.password;
    this.role = student.role;
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
    this.college_id = student.college_id;
    this.section = student.section;
  }
}
