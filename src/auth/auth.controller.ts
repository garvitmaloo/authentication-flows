import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async handleLogin(@Req() req: Request) {
    const { email, password } = req.body;
    await this.authService.login({ email, password });
    return 'Logging in';
  }

  @Post('signup')
  async handleSignup(@Req() req: Request, @Res() res: Response) {
    const { email, password, imageUrl } = req.body;
    const { error, result } = await this.authService.signup({
      email,
      password,
      imageUrl,
    });

    if (error) return res.status(401).json({ error, result });

    const { token, ...details } = result;

    if (token) {
      res.cookie('secureToken', token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    return res.status(201).json({
      error: null,
      result: details,
    });
  }

  @Post('logout')
  async handleLogout() {
    return 'Logged out';
  }
}
