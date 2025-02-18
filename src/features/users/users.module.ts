import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/db/models';
import { KeyvCacheModule } from '@app/cashe';

@Module({
  imports: [SequelizeModule.forFeature([User]), KeyvCacheModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
