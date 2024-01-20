import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'admin', timestamps: true })
export class AdminEntity {
  @Prop({ required: true, type: String })
  username: string;
  @Prop({ required: true, type: String })
  password: string;
}
