import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../models/role.entity';

@Injectable()
export class RoleMapper {
  toEntity(roleDTO: RoleDTO): RoleEntity {
    return plainToClass(RoleEntity, roleDTO);
  }
}
