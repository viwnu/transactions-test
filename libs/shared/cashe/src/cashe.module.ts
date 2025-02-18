import { Module } from '@nestjs/common';
import { CacheService } from './cashe.service';
import { KeyvConfigService } from './config/keyv.config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.registerAsync(KeyvConfigService())],
  providers: [CacheService],
  exports: [CacheService],
})
export class KeyvCacheModule {}
