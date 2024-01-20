import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'admin1', timestamps: true })
export class AdminEntity {
  @Prop({ required: true, type: String })
  username: string;
  @Prop({ required: true, type: String })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminEntity);
