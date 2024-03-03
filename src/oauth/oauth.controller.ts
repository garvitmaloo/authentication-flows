import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleOAuthGuard } from './utils/google-oauth.guard';

@Controller('oauth')
export class OauthController {
  @Get('google-login')
  @UseGuards(GoogleOAuthGuard)
  async handleGoogleOAuthLogin(@Res() res: Response) {
    return res.send('Logging in!');
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async handleGoogleOAuthRedirect(@Res() res: Response) {
    return res.send('You are successfully authenticated!');
  }

  @Get('google-logout')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleOAuthLogout(@Req() req: Request) {
    req.session.destroy((err) => {
      console.error(err);
    });

    return 'You are successfully logged out!';
  }
}
