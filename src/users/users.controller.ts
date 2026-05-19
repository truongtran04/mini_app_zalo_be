import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { ZaloService } from '../zalo/zalo.service';
import { CreateZaloUserDto } from './dto/create-zalo-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private zaloService: ZaloService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post('zalo')
  async createFromZalo(@Body() dto: CreateZaloUserDto) {
    const phone = await this.zaloService.decodePhoneToken(
      dto.token,
      dto.accessToken,
    );
    return this.usersService.createOrUpdate({ name: dto.name, phone });
  }
}
