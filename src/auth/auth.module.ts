import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userSchema } from 'src/models/User';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token-User', schema: userSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
