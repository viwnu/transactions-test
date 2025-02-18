import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  private readonly logger = new Logger(CacheService.name);

  async get(key: string): Promise<any | null> {
    return await this.cacheService.get(key);
  }

  async set(key: string, value: Record<string, any>): Promise<void> {
    await this.cacheService.set(key, value).catch((e) => console.error(e));
  }
}
