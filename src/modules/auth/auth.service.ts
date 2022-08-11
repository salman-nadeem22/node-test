import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.sendToken({_id:user._id});
  }

  login(payload: { user: any }) {
    const { user } = payload;
    return this.sendToken({ _id: user.id });
  }

  sendToken(data: { _id: string }) {
    const { accessToken } = this.accessToken(data);
    return { state: 'LOGIN', access: accessToken };
  }

  IsAccessVerified(payload) {
    return true;
  }

  accessToken(payload: { _id: string }) {
    return {
      accessToken: this.jwtService.sign(
        { id: payload._id },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRE'),
        },
      ),
    };
  }
}
