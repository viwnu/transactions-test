import { createKeyv, Keyv } from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';

export const KeyvConfigService = () => ({
  useFactory: async (configService: ConfigService) => ({
    stores: [
      new Keyv({
        store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
      }),
      createKeyv({
        url: configService.get('REDIS_URI'),
        socket: {
          reconnectStrategy: (retries, cause) => {
            console.log('cause', cause);
            return Math.min(retries * 50, 500);
          },
        },
      }),
    ],
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
