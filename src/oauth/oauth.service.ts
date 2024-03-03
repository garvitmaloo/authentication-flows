import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, Types } from 'mongoose';

import { UserDetails } from 'src/types';

@Injectable()
export class OauthService {
  constructor(
    @InjectModel('OAuthUser') private readonly userModel: Model<UserDetails>,
  ) {}

  async googleLogin(userDetails: UserDetails): Promise<
    Document<unknown, object, UserDetails> &
      UserDetails & {
        _id: Types.ObjectId;
      }
  > {
    const userExists = await this.userModel.findOne({
      email: userDetails.email,
    });

    if (userExists) {
      return userExists;
    }

    const result = await this.userModel.create(userDetails);
    return result;
  }
}
