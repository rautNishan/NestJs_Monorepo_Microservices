export interface IAttendance {
  student_id: string;
  student_name: string;
  section: string[];
  attendance_date: Date;
  status: string;
}
