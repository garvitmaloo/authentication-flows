import { Injectable } from '@nestjs/common';
import { UserLoginDetails, UserSignupDetails } from 'src/types';

@Injectable()
export class AuthService {
  async login(loginDetails: UserLoginDetails) {
    console.log('Details = ', loginDetails);
  }

  async signup(signupDetails: UserSignupDetails) {
    console.log('Signup = ', signupDetails);
  }
}
