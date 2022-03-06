/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../../../entities/user.entity';
import { CreateUserInput } from '../../../modules/users/dto/create-user.types';
import { UsersRepository } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';
import { MockUserEntity, MockUsersRepository } from './mocks';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;
  let mockInput: CreateUserInput;
  let mockUser: UserEntity;

  beforeAll(() => {
    mockUser = MockUserEntity();

    mockInput = {
      email: mockUser.email,
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    it('should throw an error if the user does not exist', async () => {
      // arrange
      const usersRepositoryFindOneSpy = jest
        .spyOn<UsersRepository, 'findOne'>(usersRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser));

      const usersRepositorySaveSpy = jest
        .spyOn<UsersRepository, 'save'>(usersRepository, 'save')
        .mockImplementation(() => null);

      // act & assert
      await expect(userService.create(mockInput)).rejects.toThrow(
        new BadRequestException('User already exists!'),
      );

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith({
        email: mockInput.email,
      });

      expect(usersRepositorySaveSpy).toHaveBeenCalledTimes(0);
    });

    it('should successfully save a user and return the newly created data', async () => {
      // arrange
      const usersRepositoryFindOneSpy = jest
        .spyOn<UsersRepository, 'findOne'>(usersRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      const usersRepositorySaveSpy = jest
        .spyOn<UsersRepository, 'save'>(usersRepository, 'save')
        .mockImplementation(() => null);

      const usersRepositoryGetUserByEmailSpy = jest
        .spyOn<UsersRepository, 'getUserByEmail'>(
          usersRepository,
          'getUserByEmail',
        )
        .mockImplementation(() => Promise.resolve(mockUser));

      // act
      const result = await userService.create(mockInput);

      // assert
      expect(result).toEqual(mockUser);

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith({
        email: mockInput.email,
      });

      expect(usersRepositorySaveSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositorySaveSpy).toHaveBeenCalledWith({
        email: mockInput.email,
      });

      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByEmailSpy).toHaveBeenCalledWith(
        mockInput.email,
      );
    });
  });
  describe('findOne', () => {
    it('should fetch the correct user', async () => {
      // arrange
      const usersRepositoryGetUserByIdSpy = jest
        .spyOn<UsersRepository, 'getUserById'>(usersRepository, 'getUserById')
        .mockImplementation(() => Promise.resolve(mockUser));

      // act
      const result = await userService.findOne(mockUser.id);

      // assert
      expect(result).toEqual(mockUser);

      expect(usersRepositoryGetUserByIdSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByIdSpy).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw an error if the user with the passed id is not found', async () => {
      // arrange
      const usersRepositoryGetUserByIdSpy = jest
        .spyOn<UsersRepository, 'getUserById'>(usersRepository, 'getUserById')
        .mockImplementation(() => null);

      // act
      await expect(userService.findOne(mockUser.id)).rejects.toThrow(
        BadRequestException,
      );

      // assert
      expect(usersRepositoryGetUserByIdSpy).toHaveBeenCalledTimes(1);
      expect(usersRepositoryGetUserByIdSpy).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
