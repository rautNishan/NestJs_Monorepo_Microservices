import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const SectionSchema = SchemaFactory.createForClass(SectionEntity);
