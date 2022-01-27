import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConsentTypes } from '../modules/consent/constants';
import UserEntity from './user.entity';

@Entity('consent_events')
export class ConsentEventsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.consentEvents, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ type: 'enum', name: 'consent_name', enum: ConsentTypes })
  consentName: ConsentTypes;

  @Column({ type: 'bool', name: 'enabled', default: false })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
