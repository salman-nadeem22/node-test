import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@decorators/index';
import { BasicAuthGuard } from '@guards/index';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @Get('login')
  async login(@User() user) {
    return this.authService.login({ user });
  }
}
