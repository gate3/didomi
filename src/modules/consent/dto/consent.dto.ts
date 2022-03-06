import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { ConsentEventsEntity } from '../../../entities/consent-events.entity';
import { ConsentTypes } from '../constants';

abstract class ConsentEvent {
  @ApiProperty({
    enum: ConsentTypes,
    isArray: false,
    example: `${ConsentTypes.ALL_NOTIFICATIONS} | ${ConsentTypes.EMAIL_NOTIFICATIONS}`,
  })
  id: ConsentTypes;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}

export class CreateConsentEventDto extends ConsentEvent {}

// We have a different type for response and DTO in case we need to extend either of them. The abstract class is to avoid repetition
export class ConsentEventResponse extends ConsentEvent {
  constructor(consentEvent: ConsentEventsEntity) {
    super();
    Object.assign(this, consentEvent);
  }
}
