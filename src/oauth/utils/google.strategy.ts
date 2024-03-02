import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  // executes after Google returns the requested user information
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('ACT = ', accessToken);
    console.log('RFT = ', refreshToken);
    console.log('PROF = ', profile);
  }
}
