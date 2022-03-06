import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConsentEventsEntity } from '../../../entities/consent-events.entity';
import UserEntity from '../../../entities/user.entity';
import ConsentEventsRepository from '../../../modules/consent/consent-events.repository';
import { ConsentService } from '../../../modules/consent/consent.service';
import { ConsentTypes } from '../../../modules/consent/constants';
import { CreateConsentEventDto } from '../../../modules/consent/dto/consent.dto';
import { UsersRepository } from '../../../modules/users/users.repository';
import { MockUserEntity, MockUsersRepository } from '../users/mocks';
import { MockConsentEventsEntity, MockConsentEventsRepository } from './mocks';

describe('ConsentService', () => {
  let consentService: ConsentService;
  let consentEventsRepository: ConsentEventsRepository;
  let usersRepository: UsersRepository;
  let mockInput: CreateConsentEventDto;
  let mockConsentEvents: ConsentEventsEntity;
  let mockUser: UserEntity;

  beforeAll(() => {
    mockConsentEvents = MockConsentEventsEntity();
    mockUser = MockUserEntity();

    mockInput = {
      id: ConsentTypes.ALL_NOTIFICATIONS,
      email: 'some-email@email.com',
      enabled: true,
    };
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsentService,
        {
          provide: getRepositoryToken(ConsentEventsRepository),
          useClass: MockConsentEventsRepository,
        },
        {
          provide: getRepositoryToken(UsersRepository),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    consentService = module.get<ConsentService>(ConsentService);
    consentEventsRepository = module.get<ConsentEventsRepository>(
      ConsentEventsRepository,
    );
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    it('should throw an error if an invalid consent type is provided.', async () => {
      // arrange
      const isValidConsentSpy = jest
        .spyOn<ConsentEventsRepository, 'isValidConsent'>(
          consentEventsRepository,
          'isValidConsent',
        )
        .mockImplementation(() => Promise.resolve(false));

      const usersRepositoryGetUserByEmailSpy = jest
        .spyOn<UsersRepository, 'getUserByEmail'>(
          usersRepository,
          'getUserByEmail',
        )
        .mockImplementation(() => Promise.resolve(mockUser));

      const consentExistsForUserSpy = jest
        .spyOn<ConsentEventsRepository, 'consentExistsForUser'>(
          consentEventsRepository,
          'consentExistsForUser',
        )
        .mockImplementation(() => Promise.resolve(false));

      // act & assert
      await expect(consentService.create(mockInput)).rejects.toThrow(
        new BadRequestException('Invalid consent option provided!'),
      );

      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledWith(
        mockInput.email,
      );

      expect(isValidConsentSpy).toHaveBeenCalledTimes(1);
      expect(isValidConsentSpy).toHaveBeenLastCalledWith(mockInput.id);

      expect(consentExistsForUserSpy).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if an invalid user email is provided.', async () => {
      // arrange
      const isValidConsentSpy = jest
        .spyOn<ConsentEventsRepository, 'isValidConsent'>(
          consentEventsRepository,
          'isValidConsent',
        )
        .mockImplementation(() => Promise.resolve(true));

      const usersRepositoryGetUserByEmailSpy = jest
        .spyOn<UsersRepository, 'getUserByEmail'>(
          usersRepository,
          'getUserByEmail',
        )
        .mockImplementation(() => Promise.resolve(null));

      const consentExistsForUserSpy = jest
        .spyOn<ConsentEventsRepository, 'consentExistsForUser'>(
          consentEventsRepository,
          'consentExistsForUser',
        )
        .mockImplementation(() => Promise.resolve(false));

      // act & assert
      await expect(consentService.create(mockInput)).rejects.toThrow(
        new BadRequestException('User not found!'),
      );

      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledWith(
        mockInput.email,
      );

      expect(isValidConsentSpy).toHaveBeenCalledTimes(1);
      expect(isValidConsentSpy).toHaveBeenLastCalledWith(mockInput.id);

      expect(consentExistsForUserSpy).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if an invalid user email is provided.', async () => {
      // arrange
      const isValidConsentSpy = jest
        .spyOn<ConsentEventsRepository, 'isValidConsent'>(
          consentEventsRepository,
          'isValidConsent',
        )
        .mockImplementation(() => Promise.resolve(true));

      const consentExistsForUserSpy = jest
        .spyOn<ConsentEventsRepository, 'consentExistsForUser'>(
          consentEventsRepository,
          'consentExistsForUser',
        )
        .mockImplementation(() => Promise.resolve(true));

      const usersRepositoryGetUserByEmailSpy = jest
        .spyOn<UsersRepository, 'getUserByEmail'>(
          usersRepository,
          'getUserByEmail',
        )
        .mockImplementation(() => Promise.resolve(mockUser));

      // act & assert
      await expect(consentService.create(mockInput)).rejects.toThrow(
        new BadRequestException('Consent already exists for user'),
      );

      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledWith(
        mockInput.email,
      );

      expect(isValidConsentSpy).toHaveBeenCalledTimes(1);
      expect(isValidConsentSpy).toHaveBeenLastCalledWith(mockInput.id);

      expect(consentExistsForUserSpy).toHaveBeenCalledTimes(1);
      expect(consentExistsForUserSpy).toHaveBeenLastCalledWith(
        mockUser.id,
        mockConsentEvents.consentName,
      );
    });
  });
});
