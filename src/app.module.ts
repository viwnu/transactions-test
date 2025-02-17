import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './db';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [SequelizeModule.forRootAsync(SequelizeConfigService()), UsersModule],
})
export class AppModule {}
