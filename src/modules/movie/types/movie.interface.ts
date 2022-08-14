import { IAudit } from '@/common/types';
import { IComment } from './comment.interface';

export interface IMovie {
  name: string;
  slug: string;
  description: string;
  country: string;
  genre: string[];
  photo: string;
  releaseDate: Date;
  rating: number;
  comments?: IComment[];
  price: number;
  audit: IAudit;
}
