import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find();
    return users.map((user: UserEntity) => {
      delete user.password;
      return user;
    });
  }

  async getById(id: number): Promise<UserEntity> {
    const targetUser: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });
    delete targetUser.password;
    return targetUser;
  }

  async getByNickname(nickname: string): Promise<UserEntity> {
    const targetUser: UserEntity = await this.userRepository.findOne({
      where: { nickname: nickname },
    });
    delete targetUser.password;
    return targetUser;
  }

  async searchUsersByNickname(nickname: string) {
    // implement users search by nickname. Include spelling errors and recommendations (?)
  }

  async update(id: number, userDTO) {
    const targetUser: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!targetUser) throw new NotFoundException('User not found.');

    const updatedUser: UserEntity = await this.userMapper.toExistingEntity(
      targetUser,
      userDTO,
    );
    await this.userRepository.save(updatedUser);
    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number) {
    // delete target user from FriendsLists table
  }
}
