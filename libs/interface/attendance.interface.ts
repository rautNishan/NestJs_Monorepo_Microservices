export interface ITimeTable {
  startTime: string;
  endTime: string;
}
export interface IAttendance {
  student_id: string;
  student_name: string;
  section: string[];
  attendance_date: Date;
  status: string;
  timeTable: ITimeTable;
}
