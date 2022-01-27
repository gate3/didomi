import { EntityRepository } from 'typeorm';
import { ConsentEventsEntity } from '../../entities/consent-events.entity';
import UserEntity from '../../entities/user.entity';
import BaseRepository from '../../shared/base.repository';
import { ConsentTypes } from './constants';

interface IConsentEventsRepository {
  consentExists(consentName: string): Promise<ConsentEventsEntity[]>;

  consentExistsForUser(
    userId: string,
    consentName: ConsentTypes,
  ): Promise<boolean>;

  createConsentEvent(
    consentName: ConsentTypes,
    user: UserEntity,
    isEnabled: boolean,
  ): Promise<ConsentEventsEntity>;
}

@EntityRepository(ConsentEventsEntity)
export default class ConsentEventsRepository
  extends BaseRepository<ConsentEventsEntity>
  implements IConsentEventsRepository
{
  async consentExists(consentName: string): Promise<ConsentEventsEntity[]> {
    return this.find({
      where: { consentName },
    });
  }

  async consentExistsForUser(
    userId: string,
    consentName: ConsentTypes,
  ): Promise<boolean> {
    const consentExistsForUser = await this.findOne({
      where: {
        consentName: consentName,
        user: { id: userId },
      },
    });
    return consentExistsForUser != null;
  }

  async createConsentEvent(
    consentName: ConsentTypes,
    user: UserEntity,
    isEnabled = false,
  ): Promise<ConsentEventsEntity> {
    await this.save({
      user,
      consentName: consentName,
      enabled: isEnabled,
    });
    return this.findOne({
      where: {
        consentName,
        user: { id: user.id },
      },
    });
  }

  // Due to the nature of enums in postgres, a query to do a direct check on an invalid enum will not work
  // This query checks the pg_enum which contains a catalogue of all enums
  // More here https://sadique.io/blog/2019/05/09/looking-up-enum-types-and-values-in-postgres/
  async isValidConsent(consentName: ConsentTypes): Promise<boolean> {
    const result = await this.query(
      `SELECT * FROM pg_enum WHERE enumlabel = '${consentName}'`,
    );
    return result.length > 0;
  }
}
