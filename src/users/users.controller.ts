import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    // return `add ${createUserDto.name}`;
  }

  @Get()
  async getUsers() {
    return [];
  }

  @Get(':id')
  async getUserInfo() {
    throw new InternalServerErrorException();
    // return 'hello';
  }
}
