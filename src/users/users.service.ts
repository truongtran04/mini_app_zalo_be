import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const existing: any = await this.usersRepository.findByPhone(dto.phone);

    if (existing) {
      throw new ConflictException('Phone already exists');
    }

    return this.usersRepository.create(dto);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }
}
