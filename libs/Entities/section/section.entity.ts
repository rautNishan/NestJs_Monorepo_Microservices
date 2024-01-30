import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { studentDataBaseName } from '../student/student.entity';

export const sectionDataBaseName = 'section';
@Schema({ collection: sectionDataBaseName, timestamps: true })
export class SectionEntity {
  @Prop({
    required: true,
    type: String,
    example: 'N5',
  })
  section: string;
  @Prop({
    ref: studentDataBaseName,
    type: [Types.ObjectId],
  })
  students: Types.ObjectId[];
}
