import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('FriendsLists')
export class FriendListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user1: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user2: UserEntity;
}
