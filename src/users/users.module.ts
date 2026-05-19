import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ZaloModule } from '../zalo/zalo.module';

@Module({
  imports: [ZaloModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
