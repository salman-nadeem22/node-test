import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsDefined } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  username!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  email!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  password!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  dateOfBirth!: Date;
}
