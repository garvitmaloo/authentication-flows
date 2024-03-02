import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { GoogleOAuthGuard } from './utils/google-oauth.guard';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @Get('google-login')
  @UseGuards(GoogleOAuthGuard)
  async handleGoogleOAuthLogin(@Req() req: Request) {
    console.log('REQUEST = ', req);
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async handleGoogleOAuthRedirect(@Req() req: Request) {
    return this.oauthService.googleLogin(req);
  }
}
