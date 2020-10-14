import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
import { User } from '../../../domain/users/user.model';
import { UserMapper } from '../../mappers/user.mapper';
import { DuplicatedUserError } from './duplicated.user.error';
import { Logger } from '@nestjs/common';

export class UsersRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async findOne(_id: string): Promise<User | undefined> {
    const userEntity = await this.usersRepository.findOne(_id);

    if (userEntity instanceof UserEntity) {
      return UserMapper.toDomain(userEntity);
    }

    return undefined;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const userEntities = await this.usersRepository.find({
      where: { email: email },
    });

    if (userEntities.length > 0) {
      if (userEntities.length === 1) {
        return UserMapper.toDomain(userEntities[0]);
      }

      Logger.error('UsersRepository : Too many user found for this email');
      throw new DuplicatedUserError(
        'UsersRepository : Too many user found for this email',
      );
    }

    return undefined;
  }

  public async findByEmail(email: string): Promise<User[]> {
    const userEntities = await this.usersRepository.find({
      where: { email: email },
    });

    const users = new Array<User>();
    userEntities.forEach(userEntity => {
      users.push(UserMapper.toDomain(userEntity));
    });

    return users;
  }

  public async save(user: User): Promise<User> {
    const userEntity = await this.usersRepository.save(
      UserMapper.toPersistence(user),
    );

    return UserMapper.toDomain(userEntity);
  }
}
