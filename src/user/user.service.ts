import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id: id });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const currentUser = await this.userRepository.findOneBy({ id: id });
    if (!currentUser) {
      throw new Error(`User #${id} not found`);
    }
    await this.userRepository.merge(currentUser, updateUserDto);
    return this.userRepository.save(currentUser);
  }

  async remove(id: number) {
    const currentUser = await this.userRepository.findOneBy({ id: id });
    if (!currentUser) {
      throw new Error(`User #${id} not found`);
    }
    return this.userRepository.remove(currentUser);
  }
}
