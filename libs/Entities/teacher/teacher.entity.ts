import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  email: string;

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

  @Prop({ required: true, type: String })
  role: string;
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherEntity);
