import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Movie, MovieDocument } from './schema/movie.schema';
import { Comment, CommentDocument } from './schema/comment.schema';
import { IMovie } from './types/movie.interface';
import { IComment } from './types/comment.interface';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  // ? Movies Related
  async create(createMovieDto: CreateMovieDto) {
    const movieNameExists = await this.movieModel.findOne({
      name: createMovieDto.name,
    });
    if (movieNameExists)
      throw new BadRequestException('Movie Name Already Exists');

    const movie = new this.movieModel(createMovieDto);
    await movie.save();
    return movie;
  }

  async findAll() {
    return (
      await this.movieModel.aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$movie', '$$id'] }],
                  },
                },
              },
            ],
            as: 'comments',
          },
        },
      ])
    ).map((movie: IMovie) => ({
      ...movie,
      comments: this.transformComments(movie.comments),
    }));
  }

  async findOne(slug: string) {
    const [movie] = await this.movieModel.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: 'comments',
          let: { id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$movie', '$$id'] }],
                },
              },
            },
          ],
          as: 'comments',
        },
      },
    ]);
    if (!movie) throw new NotFoundException('Movie Not Found.');
    movie.comments = this.transformComments(movie['comments']);
    return movie;
  }

  // ? Comments Related
  async createComment(user, payload: CreateCommentDto) {
    const comment = new this.commentModel({ ...payload, name: user.username });
    await comment.save();
    return comment;
  }

  private transformComments(comments: IComment[]) {
    const transformedComments = {};
    comments.forEach((comment) => {
      if (transformedComments[comment.parent]) {
        if (!transformedComments[comment.parent]?.children) {
          transformedComments[comment.parent].children = [comment];
        } else transformedComments[comment.parent].children.push(comment);
        return;
      }
      transformedComments[comment._id] = comment;
    });
    return Object.values(transformedComments);
  }
}
