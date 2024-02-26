import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ISessionDetails } from './types';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setCache(key: string, value: ISessionDetails) {
    await this.cacheManager.set(key, value, 0);
  }

  async getCache(key: string): Promise<ISessionDetails> {
    const value = await this.cacheManager.get<ISessionDetails>(key);
    return value;
  }
}
