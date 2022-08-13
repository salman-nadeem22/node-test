import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as mongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

class Audit {
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted: boolean;
}

@Schema()
export class Comment extends Document {
  @Prop({ type: String, ref: 'users', required: true })
  name!: string;

  @Prop({ type: String, required: true })
  comment!: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    required: false,
    ref: 'comments',
  })
  parent!: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    required: true,
    ref: 'movies',
  })
  movie!: string;

  @Prop({
    type: Audit,
    default: { isDeleted: false },
    required: true,
  })
  audit!: Audit;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre<Comment>('save', async function (done: () => void) {
  this.audit.createdAt = this.audit.createdAt || new Date();
  this.audit.updatedAt = new Date();
  done();
});
