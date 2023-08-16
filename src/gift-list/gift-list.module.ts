import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftListEntity } from './models/gift-list.entity';
import { GiftListService } from './gift-list.service';
import { GiftListController } from './gift-list.controller';
import { GiftListMapper } from './mapper/gift-list.mapper';
import { UserService } from '../user';
import { UserEntity } from '../user/models/user.entity';
import { UserMapper } from '../user/mapper/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([GiftListEntity, UserEntity])],
  providers: [GiftListService, GiftListMapper, UserService, UserMapper],
  controllers: [GiftListController],
})
export class GiftListModule {}
