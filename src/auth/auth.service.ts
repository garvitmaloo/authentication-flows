import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validator from 'validator';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { IServerResponse, IUser, IUserLogin } from 'src/types';
import type {
  UserDocumentWithoutPassword,
  UserDocument,
} from 'src/models/User';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findUserByEmail(email: string): Promise<IServerResponse<UserDocument>> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return {
          result: null,
          error: 'No user found with the given email',
        };
      }

      return {
        result: user.toObject(),
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
  ): Promise<IServerResponse<UserDocument>> {
    try {
      const user = await this.userModel.findOne({ username });

      if (!user) {
        return {
          result: null,
          error: 'No user found with the given username',
        };
      }

      return {
        result: user.toObject(),
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

  async loginUser({
    email,
    password,
  }: IUserLogin): Promise<
    IServerResponse<UserDocumentWithoutPassword & { sessionId?: string }>
  > {
    try {
      const userRecord = await this.findUserByEmail(email);

      if (!userRecord) {
        return {
          result: null,
          error: 'No user found with the given email',
        };
      }

      const passwordMatch = await compare(password, userRecord.result.password);

      if (!passwordMatch) {
        return {
          result: null,
          error: 'Incorrect password',
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userDetails } = userRecord.result;

      const sessionId = uuid();
      // const generatedAt = Date.now();
      // const expiresIn = 60000;

      return {
        result: { ...userDetails, sessionId },
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
