import UserEntity from '../../../entities/user.entity';

/* eslint-disable @typescript-eslint/no-empty-function */
export class MockUsersRepository {
  async findOne(): Promise<void> {}

  async save(): Promise<void> {}

  async getUserById(): Promise<void> {}

  async getUserByEmail(): Promise<void> {}

  async deleteUser(): Promise<void> {}
}

export class MockUserService {
  async create(): Promise<void> {}
  async findOne(): Promise<void> {}
  async remove() {}
}

// TODO - I would use a library here that can be used to generate random user data
// or a factory method to generate random user data
export const MockUserEntity = (
  userEntity?: Partial<UserEntity>,
): UserEntity => ({
  id: 'someId',
  email: 'test@email.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  consentEvents: [],
  ...userEntity,
});
