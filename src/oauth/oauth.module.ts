import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OAuthUserSchema } from 'src/models/User';

import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OAuthUser', schema: OAuthUserSchema }]),
  ],
  providers: [OauthService],
  controllers: [OauthController],
  exports: [OauthService],
})
export class OauthModule {}
