import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('GiftsLists')
export class GiftListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user: UserEntity;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isArchived: boolean;

  @Column()
  degreeOfDesire: number;
}
