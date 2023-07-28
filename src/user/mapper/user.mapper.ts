import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class UserMapper {
  async toExistingEntity(
    userEntity: UserEntity,
    userDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    return plainToClassFromExist(userEntity, userDTO);
  }
}
