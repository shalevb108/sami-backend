import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }
  @Get(':username/:password')
  findOne(@Param('username') username: string, @Param('password') password: string) {
    return this.usersService.findOne(username, password);
  }

}
