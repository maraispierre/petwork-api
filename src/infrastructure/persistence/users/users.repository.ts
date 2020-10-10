import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
import { User } from '../../../domain/users/user.model';
import { UserMapper } from '../../mappers/user.mapper';

export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(_id: string): Promise<User | undefined> {
    const userEntity = await this.usersRepository.findOne(_id);

    if (userEntity instanceof UserEntity) {
      return UserMapper.toDomain(userEntity);
    }

    return undefined;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const userEntities = await this.usersRepository.find({
      where: { email: email },
    });

    if (userEntities.length > 0) {
      if (userEntities.length === 1) {
        return UserMapper.toDomain(userEntities[0]);
      }
      throw new Error('Too many user found for this email');
    }

    return undefined;
  }

  async findByEmail(email: string): Promise<User[]> {
    const userEntities = await this.usersRepository.find({
      where: { email: email },
    });

    const users = new Array<User>();
    userEntities.forEach(userEntity => {
      users.push(UserMapper.toDomain(userEntity));
    });

    return users;
  }

  async save(user: User): Promise<User> {
    const userEntity = await this.usersRepository.save(
      UserMapper.toPersistence(user),
    );

    return UserMapper.toDomain(userEntity);
  }
}
