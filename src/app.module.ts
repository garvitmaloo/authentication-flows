import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthModule } from './oauth/oauth.module';
import { GoogleStrategy } from './oauth/utils/google.strategy';
import { SessionSerializer } from './oauth/utils/session.serializer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, SessionSerializer],
})
export class AppModule {}
