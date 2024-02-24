import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';

import { IServerResponse, IUser } from 'src/types';
import type { UserDocumentWithoutPassword } from 'src/models/User';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findUserByEmail(
    email: string,
  ): Promise<IServerResponse<UserDocumentWithoutPassword>> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return {
          result: null,
          error: 'No user found with the given email',
        };
      }

      return {
        result: user,
        error: null,
      };
    } catch (err) {
      return {
        result: null,
        error: 'Something went wrong',
      };
    }
  }

  async findUserByUsername(
    username: string,
  ): Promise<IServerResponse<UserDocumentWithoutPassword>> {
    try {
      const user = await this.userModel.findOne({ username });

      if (!user) {
        return {
          result: null,
          error: 'No user found with the given username',
        };
      }

      return {
        result: user,
        error: null,
      };
    } catch (err) {
      return {
        result: null,
        error: 'Something went wrong',
      };
    }
  }

  async registerNewUser({
    username,
    email,
    password,
  }: IUser): Promise<IServerResponse<UserDocumentWithoutPassword>> {
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
        result: null,
        error: 'Email is not valid',
      };
    }

    if (!isUsernameValid) {
      return {
        result: null,
        error:
          'Username is not valid. It should only contain alphabets and numeric characters',
      };
    }

    if (!isPasswordValid) {
      return {
        result: null,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userWithoutPassword } = res.toJSON();

      return {
        result: userWithoutPassword,
        error: null,
      };
    } catch (err) {
      return {
        result: null,
        error: 'Something went wrong',
      };
    }
  }
}
