import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @Length(1, 500)
  comment!: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  movie!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parent!: string;
}
