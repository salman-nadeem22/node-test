import { compareHash, generateHash } from '@/common/crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    return this.userModel.find().select('-password');
  }

  async validateUser(payload: { email: string; password: string }) {
    const user = await this.userModel.findOne({
      email: payload.email,
      'audit.isDeleted': false,
    });

    if (!user) throw new BadRequestException('Invalid Credentials');
    if (!(await compareHash(payload.password, user.password)))
      throw new BadRequestException('Invalid Credentials');

    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User Not Found.');
    return user;
  }
}
