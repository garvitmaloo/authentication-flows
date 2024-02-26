import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdminResource() {
    return 'Here is the resource from DB';
  }
}
