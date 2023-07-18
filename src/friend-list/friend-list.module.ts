import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendListEntity } from './models/friend-list.entity';
import { FriendListService } from './friend-list.service';
import { FriendListController } from './friend-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendListEntity])],
  providers: [FriendListService],
  controllers: [FriendListController],
})
export class FriendListModule {}
