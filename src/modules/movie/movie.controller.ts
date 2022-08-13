import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '@/common/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '@/common/decorators';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // ? Movies Related
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.movieService.findOne(slug);
  }

  // ? Comments Related
  @Post('post-comment')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createComment(@User() user, @Body() createCommentDto: CreateCommentDto) {
    return this.movieService.createComment(user, createCommentDto);
  }
}
