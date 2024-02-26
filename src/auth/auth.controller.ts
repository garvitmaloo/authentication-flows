import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

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

    res.cookie('username', response.result.username, {
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

  @Get('/testRoute')
  async getTestResource(@Req() req: Request) {
    const { username, sessionId } = req.cookies;

    if (!username)
      return {
        result: null,
        error: 'Error - You are not logged in',
      };

    const response = this.authService.getTestResource({ username, sessionId });

    return response;
  }
}
