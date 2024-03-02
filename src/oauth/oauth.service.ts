import { Injectable } from '@nestjs/common';

@Injectable()
export class OauthService {
  googleLogin(req) {
    console.log('USER = ', req);
  }
}
