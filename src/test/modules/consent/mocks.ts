/* eslint-disable @typescript-eslint/no-empty-function */
// TODO - I would use a library here that can be used to generate random user data

import { ConsentEventsEntity } from '../../../entities/consent-events.entity';
import { ConsentTypes } from '../../../modules/consent/constants';
import { MockUserEntity } from '../users/mocks';

export class MockConsentEventsRepository {
  async consentExists(): Promise<void> {}

  async consentExistsForUser(): Promise<void> {}

  async createConsentEvent(): Promise<void> {}

  async isValidConsent(): Promise<void> {}
}

export class MockConsentService {
  async create(): Promise<void> {}
}

// create({ id, email, enabled }: CreateConsentEventDto)
// or a factory method to generate random consent event data
export const MockConsentEventsEntity = (
  consentEntity?: Partial<ConsentEventsEntity>,
): ConsentEventsEntity => ({
  id: 1,
  consentName: ConsentTypes.ALL_NOTIFICATIONS,
  createdAt: new Date(),
  updatedAt: new Date(),
  enabled: false,
  user: MockUserEntity(),
  ...consentEntity,
});
