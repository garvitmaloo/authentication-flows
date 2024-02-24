import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

import { userSchema } from 'src/models/User';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
