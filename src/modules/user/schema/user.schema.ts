import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

class Audit {
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted: boolean;
}

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  username!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: Date, required: true })
  dateOfBirth!: Date;

  @Prop({
    type: Audit,
    default: { isDeleted: false },
    required: true,
  })
  audit!: Audit;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (done: () => void) {
  this.audit.createdAt = this.audit.createdAt || new Date();
  this.audit.updatedAt = new Date();
  done();
});
