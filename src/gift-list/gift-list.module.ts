import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftListEntity } from './models/gift-list.entity';
import { GiftListService } from './gift-list.service';
import { GiftListController } from './gift-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GiftListEntity])],
  providers: [GiftListService],
  controllers: [GiftListController],
})
export class GiftListModule {}
