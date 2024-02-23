import { Body, Controller, Get, Post } from '@nestjs/common';

import { IUser } from 'src/types';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World! From Auth';
  }

  @Post('/register')
  registerNewUser(@Body() body: IUser) {
    return this.authService.registerNewUser(body);
  }
}
