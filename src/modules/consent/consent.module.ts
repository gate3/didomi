import { Module } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { ConsentController } from './consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentEventsEntity } from '../../entities/consent-events.entity';
import ConsentEventsRepository from './consent-events.repository';
import { UsersRepository } from '../users/users.repository';
import UserEntity from '../../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsentEventsEntity,
      ConsentEventsRepository,
      UserEntity,
      UsersRepository,
    ]),
  ],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConsentModule {}
