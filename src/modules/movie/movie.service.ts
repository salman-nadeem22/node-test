import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schema/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movieNameExists = await this.movieModel.exists({
      name: createMovieDto.name,
    });
    if (movieNameExists)
      throw new BadRequestException('Movie Name Already Exists');

    const movie = new this.movieModel(createMovieDto);
    await movie.save();
    return movie;
  }

  async findAll() {
    return this.movieModel.find({ 'audit.isDeleted': false });
  }

  async findOne(slug: string) {
    const movie = await this.movieModel.findOne({ slug });
    if (!movie) throw new NotFoundException('Movie Not Found.');
    return movie;
  }
}
