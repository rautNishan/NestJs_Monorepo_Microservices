import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const facultyDataBaseName = 'faculty';
@Schema({ collection: facultyDataBaseName, timestamps: true })
export class FacultyEntity {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number, default: 0 })
  studentCounts: number;

  @Prop({ required: true, type: Number, default: 0 })
  teacherCounts: number;
}

export const FacultySchema = SchemaFactory.createForClass(FacultyEntity);
