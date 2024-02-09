import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const AttendanceDataBaseName = 'attendance';
@Schema({ collection: AttendanceDataBaseName, timestamps: true })
export class AttendanceEntity {
  @Prop({
    required: true,
    type: String,
  })
  student_id: string;

  @Prop({
    required: true,
    type: String,
  })
  student_name: string;

  @Prop({
    required: true,
    type: [String],
  })
  section: string[];

  @Prop({
    required: true,
    type: Date,
  })
  attendance_date: Date;

  @Prop({
    required: true,
    type: String,
    //P for Present A for Absent
  })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(AttendanceEntity);
