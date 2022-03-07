import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUserInput,
  UsersEntityResponse,
} from '../../../modules/users/dto/create-user.types';
import { UsersController } from '../../../modules/users/users.controller';
import { UsersService } from '../../../modules/users/users.service';
import { MockUserEntity, MockUserService } from './mocks';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: MockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('@Post - Create', () => {
    it('should pass user email to userService.create', async () => {
      const mockUserResponse = new UsersEntityResponse({
        ...MockUserEntity,
      });

      const usersServiceSpy = jest
        .spyOn<UsersService, 'create'>(usersService, 'create')
        .mockImplementation(() => Promise.resolve(mockUserResponse));

      const mockCreateUserData: CreateUserInput = {
        email: 'test@email.com',
      };

      controller.create(mockCreateUserData);

      expect(usersServiceSpy).toHaveBeenCalledTimes(1);
      expect(usersServiceSpy).toHaveBeenCalledWith(mockCreateUserData);
    });
  });

  describe('@Get - FindOne', () => {
    it('should pass user id userService.findOne', async () => {
      const mockUserResponse = new UsersEntityResponse({
        ...MockUserEntity,
      });

      const usersServiceSpy = jest
        .spyOn<UsersService, 'findOne'>(usersService, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUserResponse));

      const mockUserId = 'someId';

      const response = await controller.findOne(mockUserId);
      expect(response).toEqual(mockUserResponse);

      expect(usersServiceSpy).toHaveBeenCalledTimes(1);
      expect(usersServiceSpy).toHaveBeenCalledWith(mockUserId);
    });
  });
});
