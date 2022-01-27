import { DeleteResult, EntityRepository } from 'typeorm';
import UserEntity from '../../entities/user.entity';
import BaseRepository from '../../shared/base.repository';

// The interface here is to help us code to an interface and not an implementation
// If we ever need to change the database or data source,
// all we need to do for the new models is implement the interface and our code will not break

export interface IUserRepository {
  getUserById(id: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  deleteUser(user: UserEntity): Promise<DeleteResult>;
}

@EntityRepository(UserEntity)
export class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  getUserById(id: string): Promise<UserEntity> {
    return this.findOne({
      where: { id },
      relations: ['consentEvents'],
      select: ['id', 'email', 'consentEvents'],
    });
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.findOne({
      where: { email },
      relations: ['consentEvents'],
      select: ['id', 'email', 'consentEvents'],
    });
  }

  async deleteUser(user: UserEntity): Promise<DeleteResult> {
    return this.delete({ id: user.id });
  }
}
