import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './models/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleMapper } from './mapper/role.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, RoleMapper],
  controllers: [RoleController],
})
export class RoleModule {}
