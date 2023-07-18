import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { GiftListEntity } from '../../gift-list/models/gift-list.entity';

@Entity('LikesLists')
export class LikeListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user: UserEntity;

  @ManyToOne(() => GiftListEntity, (giftListEntity) => giftListEntity.id)
  gift: GiftListEntity;
}
