import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { User } from './models';

export const SequelizeConfigService = (): SequelizeModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    dialect: 'postgres',
    host: configService.get('PS_HOST'),
    port: Number(configService.get('PS_PORT')),
    username: configService.get('PS_USER'),
    password: configService.get('PS_PASSWORD'),
    database: configService.get('PS_DB_NAME'),
    models: [User],
    autoLoadModels: Boolean(configService.get('SYNC_DB') === 'true') || false,
    synchronize: Boolean(configService.get('SYNC_DB') === 'true') || false,
    logging: Boolean(configService.get('SQL_QUERY_LOGGING') === 'true') || false,
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
