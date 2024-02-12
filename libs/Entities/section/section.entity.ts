import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const sectionDataBaseName = 'section';

@Schema({ _id: false })
export class TimeTable {
  @Prop({
    required: true,
    type: String,
  })
  subject: string;

  @Prop({
    required: false,
    type: String,
  })
  startTime: string;

  @Prop({
    required: false,
    type: String,
  })
  endTime: string;
}
@Schema({ collection: sectionDataBaseName, timestamps: true })
export class SectionEntity {
  @Prop({
    required: true,
    type: String,
    example: 'N5',
  })
  section: string;

  @Prop({
    required: true,
    default: 0,
    type: Number,
  })
  studentCounts: number;

  @Prop({
    required: true,
    default: 0,
    type: Number,
  })
  teacherCounts: number;

  @Prop({
    required: false,
    type: [TimeTable],
  })
  timeTable?: TimeTable[];
}

export const SectionSchema = SchemaFactory.createForClass(SectionEntity);
