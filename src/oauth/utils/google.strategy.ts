import { Injectable, Inject } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';

import { UserDetails } from 'src/types';

import { OauthService } from '../oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(OauthService) private readonly oauthService: OauthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  // executes after Google returns the requested user information
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    let user: UserDetails & { _id: Types.ObjectId };
    if (accessToken) {
      user = await this.oauthService.googleLogin({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
      });
    }

    return user;
  }
}
