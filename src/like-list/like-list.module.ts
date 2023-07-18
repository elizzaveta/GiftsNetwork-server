import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeListEntity } from './models/like-list.entity';
import { LikeListService } from './like-list.service';
import { LikeListController } from './like-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LikeListEntity])],
  providers: [LikeListService],
  controllers: [LikeListController],
})
export class LikeListModule {}
