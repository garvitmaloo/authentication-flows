/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserDetails } from 'src/types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserDetails, done: Function) {
    done(null, user);
  }

  deserializeUser(payload: UserDetails, done: Function) {
    done(null, payload);
  }
}
