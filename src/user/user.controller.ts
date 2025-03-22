import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SuccessResponse } from 'src/common/responses/success.response';
import { ErrorResponse } from 'src/common/responses/error.response';
import { UserTransformer } from '../common/transformers/user.transformer';

@Controller('users')
export class UserController {
  private userTransformer: UserTransformer;

  constructor(private readonly userService: UserService) {
    this.userTransformer = new UserTransformer();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return SuccessResponse.create(
      this.userTransformer.transform(user),
      'User created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    return SuccessResponse.create(
      this.userTransformer.collection(users),
      'Users retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      return ErrorResponse.create(
        `User #${id} not found`,
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    return SuccessResponse.create(
      this.userTransformer.transform(user),
      'User retrieved successfully',
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    // try {
    const updatedUser = await this.userService.update(id, updateUserDto);
    const transformedUser = this.userTransformer.transform(updatedUser);
    return SuccessResponse.create(transformedUser, 'User updated successfully');
    // } catch (error) {
    //   return error;
    // }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.userService.remove(+id);
    return SuccessResponse.create(null, `User deleted successfully`);
  }
}
