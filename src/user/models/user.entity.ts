import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../role/models/role.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: null })
  birthday: Date;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (roleEntity) => roleEntity.id)
  role: RoleEntity;

  @Column({ default: 2 })
  roleId: number;
}
