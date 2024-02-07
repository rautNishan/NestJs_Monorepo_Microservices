import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { sectionDataBaseName } from '../section/section.entity';

@Schema({ collection: 'teacher', timestamps: true })
export class TeacherEntity {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  college_id: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    ref: sectionDataBaseName,
    required: false,
    type: [String],
  })
  section: string[];

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    required: true,
    type: String,
  })
  faculty: string;

  @Prop({
    required: true,
    type: String,
  })
  search_key: string;

  @Prop({ required: true, type: String })
  role: string;
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherEntity);
