import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import {
  StandardResponse,
  UserLoginDetails,
  UserSignupDetails,
} from 'src/types';
import { UserDocument } from 'src/models/User';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Token-User') private readonly userModel: Model<UserDocument>,
  ) {}
  async login(loginDetails: UserLoginDetails) {
    const result = (
      await this.userModel.findOne({ email: loginDetails.email })
    ).toObject();

    if (!result)
      return {
        error: 'ERROR - No user found with this email',
        result: null,
      };

    if (result.password !== loginDetails.password)
      return {
        error: 'ERROR - Incorrect password',
        result: null,
      };

    const { password: _, ...remainingDetails } = result;

    const secureToken = await jwt.sign(
      { remainingDetails },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: '3d',
      },
    );

    return {
      error: null,
      result: {
        token: secureToken,
        user: remainingDetails,
      },
    };
  }

  async signup(
    signupDetails: UserSignupDetails,
  ): Promise<StandardResponse<{ token: string; user: any }>> {
    const { email, password, imageUrl } = signupDetails;

    const userRecord = await this.userModel.findOne({ email });

    if (userRecord)
      return {
        error: 'Error - This email has already been used.',
        result: null,
      };

    // Hash the password and then store it in DB

    const newUser = (
      await this.userModel.create({ email, password, imageUrl })
    ).toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userDetails } = newUser;

    const secureToken = await jwt.sign(
      { userDetails },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: '3d',
      },
    );

    return {
      error: null,
      result: {
        token: secureToken,
        user: userDetails,
      },
    };
  }
}
