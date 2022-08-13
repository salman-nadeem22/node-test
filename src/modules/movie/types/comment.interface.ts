import { IAudit } from '@/common/types';

export interface IComment extends IAudit {
  _id: string;
  parent: string;
  name: string;
  movie: string;
  comment: string;
  children?: IComment[];
}
