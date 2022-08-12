import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

class Audit {
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted: boolean;
}

@Schema()
export class Movie extends Document {
  @Prop({ type: String, required: true, unique: true })
  name!: string;

  @Prop({ type: String, required: false, default: '' })
  slug: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, required: true })
  country!: string;

  @Prop({ type: [String], required: true })
  genre!: string[];

  @Prop({ type: String, required: true })
  photo!: string;

  @Prop({ type: Date, required: true })
  releaseDate!: string;

  @Prop({ type: Number, required: true })
  rating!: number;

  @Prop({ type: Number, required: true })
  price!: number;

  @Prop({
    type: Audit,
    default: { isDeleted: false },
    required: true,
  })
  audit!: Audit;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.pre<Movie>('save', async function (done: () => void) {
  this.audit.createdAt = this.audit.createdAt || new Date();
  this.slug = this.slug || this.name.toLowerCase().split(' ').join('-');
  this.audit.updatedAt = new Date();
  done();
});
