import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@/common/decorators/index';
import { BasicAuthGuard } from '@/common/guards/index';
import { CreateUserDto } from '../user/dto/create-user.dto';

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

  @Post('register')
  async register(@Body() createUserDto:CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
