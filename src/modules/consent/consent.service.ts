import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import ConsentEventsRepository from './consent-events.repository';
import { ConsentEventResponse, CreateConsentEventDto } from './dto/consent.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class ConsentService {
  constructor(
    private consentEventsRepository: ConsentEventsRepository,
    private userRepository: UsersRepository,
  ) {}

  async create({ id, email, enabled }: CreateConsentEventDto) {
    const consentName = id;
    const [consentIsValid, user] = await Promise.all([
      this.consentEventsRepository.isValidConsent(consentName),
      this.userRepository.getUserByEmail(email),
    ]);
    if (!consentIsValid) {
      throw new BadRequestException('Invalid consent option provided!');
    }

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const consentExistsForUser =
      await this.consentEventsRepository.consentExistsForUser(
        user.id,
        consentName,
      );

    if (consentExistsForUser) {
      throw new HttpException(
        'Consent already exists for user',
        HttpStatus.BAD_REQUEST,
      );
    }

    const consentEvent = await this.consentEventsRepository.createConsentEvent(
      consentName,
      user,
      enabled,
    );

    return new ConsentEventResponse(consentEvent);
  }
}
