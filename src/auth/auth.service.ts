import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';

import { IUser } from 'src/types';
import type { UserDocument } from 'src/models/User';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (err) {
      return {
        result: 'Error',
        error: err,
      };
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      return user;
    } catch (err) {
      return {
        result: 'Error',
        error: err,
      };
    }
  }

  async registerNewUser({ username, email, password }: IUser): Promise<{
    result: string | UserDocument;
    error: string | null | unknown;
  }> {
    const isEmailValid = validator.isEmail(email);
    const isUsernameValid = validator.isAlphanumeric(username);
    const isPasswordValid = validator.isStrongPassword(password, {
      minLength: 8,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    });

    if (!isEmailValid) {
      return {
        result: 'Error',
        error: 'Email is not valid',
      };
    }

    if (!isUsernameValid) {
      return {
        result: 'Error',
        error:
          'Username is not valid. It should only contain alphabets and numeric characters',
      };
    }

    if (!isPasswordValid) {
      return {
        result: 'Error',
        error:
          'Password is not valid. It should have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol',
      };
    }

    try {
      const hashedPassword = await hash(password, 10);

      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
      });
      const res = await newUser.save();
      res.password = ''; // returning a blank string instead of returning the actual password hash

      return {
        result: res,
        error: null,
      };
    } catch (err) {
      return {
        result: 'Error',
        error: err,
      };
    }
  }
}
