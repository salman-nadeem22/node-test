import { generateHash } from '@/common/crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const [userExistsByEmail, userExistsByUsername] = await Promise.all([
      this.userModel.findOne({
        email: createUserDto.email,
      }),
      this.userModel.findOne({
        username: createUserDto.username,
      }),
    ]);

    if (!!userExistsByEmail)
      throw new BadRequestException('Email Already Exists.');
    if (!!userExistsByUsername)
      throw new BadRequestException('Username Already Exists.');

    const user = new this.userModel(createUserDto);
    user.password = await generateHash(createUserDto.password);
    await user.save();
    return user;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User Not Found.');
  }
}
