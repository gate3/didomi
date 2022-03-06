import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ConsentEventsEntity } from '../../../entities/consent-events.entity';
import UserEntity from '../../../entities/user.entity';

export class CreateUserInput {
  @IsEmail({
    message: 'A valid email must be provded',
  })
  @ApiProperty({ example: 'hello@world.com' })
  @IsNotEmpty()
  email: string;
}

export class UsersEntityResponse {
  id: string;
  email: string;

  @Transform(({ value }: { value: ConsentEventsEntity[] }) =>
    value.map(({ consentName, enabled }) => ({
      id: consentName,
      enabled: enabled,
    })),
  )
  @Expose({ name: 'consents' })
  consentEvents: Array<{ id: string; enabled: boolean }>;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
