import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { ZaloService } from 'src/zalo/zalo.service';
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
    // 1. Giải mã token → SĐT thật
    const phone = await this.zaloService.decodePhoneToken(dto.token);

    // 2. Upsert user (tạo mới hoặc cập nhật tên nếu đã có SĐT)
    return this.usersService.createOrUpdate({ name: dto.name, phone });
  }
}
