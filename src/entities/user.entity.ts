import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConsentEventsEntity } from './consent-events.entity';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @OneToMany(
    () => ConsentEventsEntity,
    (consentEventsEntity) => consentEventsEntity.user,
  )
  consentEvents: ConsentEventsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
