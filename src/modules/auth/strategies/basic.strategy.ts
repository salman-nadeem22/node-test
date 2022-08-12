import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly userService: UserService) {
    super({ passReqToCallback: true });
  }

  public validate = async (_req, email: string, password: string) => {
    return this.userService.validateUser({ email, password });
  };
}
