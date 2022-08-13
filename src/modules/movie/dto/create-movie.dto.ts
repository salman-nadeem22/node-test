import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  name!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  description!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  country!: string;

  @ApiProperty()
  @Expose()
  @IsArray()
  @IsDefined()
  genre!: string[];

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  photo!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  releaseDate!: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @Min(1)
  price!: number;
}
