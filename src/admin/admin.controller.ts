import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from 'src/app.service';
import { isSessionValid } from 'src/middleware/isSessionValid';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private appService: AppService,
    private adminService: AdminService,
  ) {}

  @Get()
  async getAdminResource(@Req() req: Request) {
    const { username, sessionId } = req.cookies;

    if (!username)
      return {
        result: null,
        error: 'Error - You are not logged in',
      };

    const sessionDetails = await this.appService.getCache(username);

    const result = isSessionValid(sessionDetails, { username, sessionId });

    if (result.error && result.result !== 'Session Valid') {
      return result;
    }

    return this.adminService.getAdminResource();
  }
}
