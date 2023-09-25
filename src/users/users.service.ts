import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const userExist = await this.checkUserExists(email);

    if (userExist) {
      throw new UnprocessableEntityException('This email exists.');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await this.usersRepository.save(user);
  }

  getUser(id: string) {
    console.log(id);
  }

  private async checkUserExists(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return !!user;
  }
}
