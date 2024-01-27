import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'admin', timestamps: true })
export class AdminEntity {
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ required: true, type: String })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminEntity);
