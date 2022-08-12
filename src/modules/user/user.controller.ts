import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('get-me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user) {
    return user;
  }
}
