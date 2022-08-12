import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Exclude()
export class CreateMovieDto {
  @Expose()
  @IsString()
  @IsDefined()
  name!: string;

  @Expose()
  @IsString()
  @IsDefined()
  description!: string;

  @Expose()
  @IsString()
  @IsDefined()
  country!: string;

  @Expose()
  @IsArray()
  @IsDefined()
  genre!: string[];

  @Expose()
  @IsString()
  @IsDefined()
  photo!: string;

  @Expose()
  @IsString()
  @IsDefined()
  releaseDate!: string;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @Expose()
  @IsNumber()
  @Min(1)
  price!: number;
}
