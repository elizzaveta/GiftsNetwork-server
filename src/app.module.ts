import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { FriendListController } from './friend-list/friend-list.controller';
import { FriendListService } from './friend-list/friend-list.service';
import { FriendListModule } from './friend-list/friend-list.module';
import { GiftListController } from './gift-list/gift-list.controller';
import { GiftListService } from './gift-list/gift-list.service';
import { GiftListModule } from './gift-list/gift-list.module';
import { LikeListController } from './like-list/like-list.controller';
import { LikeListService } from './like-list/like-list.service';
import { LikeListModule } from './like-list/like-list.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RoleModule, FriendListModule, GiftListModule, LikeListModule, AuthModule],
  controllers: [AppController, RoleController, FriendListController, GiftListController, LikeListController, AuthController],
  providers: [AppService, RoleService, FriendListService, GiftListService, LikeListService, AuthService],
})
export class AppModule {}
