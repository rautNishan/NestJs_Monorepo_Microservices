import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const facultyDataBaseName = 'faculty';
@Schema({ collection: facultyDataBaseName, timestamps: true })
export class FacultyEntity {
  @Prop({ required: true, type: String })
  name: string;
}

export const FacultySchema = SchemaFactory.createForClass(FacultyEntity);
