import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'students', timestamps: true })
export class StudentEntity {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  section: string;

  @Prop({
    required: true,
    type: String,
  })
  course: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({ required: true, type: String })
  role: string;
}

export const StudentSchema = SchemaFactory.createForClass(StudentEntity);
