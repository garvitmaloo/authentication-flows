import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { IUser, IUserLogin } from 'src/types';

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

  @Post('/login')
  async loginUser(@Body() body: IUserLogin, @Res() res: Response) {
    const response = await this.authService.loginUser(body);

    if (response.error) {
      return res.status(400).json({
        result: null,
        error: response.error,
      });
    }

    res.cookie('sessionId', response.result.sessionId, {
      httpOnly: true,
      sameSite: 'none',
    });

    res.cookie('userId', response.result.username, {
      httpOnly: true,
      sameSite: 'none',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sessionId, ...details } = response.result;

    return res.status(200).json({
      result: details,
      error: null,
    });
  }
}
