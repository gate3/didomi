import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput, UsersEntityResponse } from './dto/create-user.types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ email }: CreateUserInput): Promise<UsersEntityResponse> {
    const userExists = await this.usersRepository.findOne({ email });
    if (userExists) {
      throw new BadRequestException('User already exists!');
    }
    await this.usersRepository.save({ email });
    const user = await this.usersRepository.getUserByEmail(email);
    return new UsersEntityResponse({
      ...user,
    });
  }

  async findOne(id: string): Promise<UsersEntityResponse> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    return new UsersEntityResponse({
      ...user,
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    await this.usersRepository.deleteUser(user);
    return new UsersEntityResponse({
      ...user,
    });
  }
}
