import { Module } from '@nestjs/common';

import { AppService } from 'src/app.service';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  providers: [AppService, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
