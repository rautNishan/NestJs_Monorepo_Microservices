import { IsNotEmpty } from 'class-validator';

export class StudentAttendanceDto {
  @IsNotEmpty()
  student_id: string;
}
