import { ConsentEventsEntity } from '../../../entities/consent-events.entity';
import { ConsentTypes } from '../constants';

abstract class ConsentEvent {
  id: ConsentTypes;
  email: string;
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
