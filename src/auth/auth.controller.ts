import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

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
  async handleSignup(@Req() req: Request) {
    const { email, password, imageUrl } = req.body;
    await this.authService.signup({ email, password, imageUrl });
    return 'Signing up';
  }

  @Post('logout')
  async handleLogout() {
    return 'Logged out';
  }
}
