import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(/* private readonly userService: UsersService */) {
    super({ passReqToCallback: true });
  }

  public validate = async (req, username: string, password: string): Promise<boolean> => {
    // const user = await this.userService.validateUser({ email: username.toLowerCase(), password });
    // if (!user) throw new BadRequestException('Invalid Credentials');

    // delete user.user.password;
    // return user;
    return true
  };
}
