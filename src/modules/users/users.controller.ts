import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.types';
import { UsersHttpExceptionFilter } from '../../helpers/errors/exception-filters/users-http-exception.filter';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseFilters(UsersHttpExceptionFilter)
  @ApiOperation({
    summary: 'Create a new user.',
  })
  create(@Body() createUserDto: CreateUserInput) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: 'Fetch a user by their user id.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a created user.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
