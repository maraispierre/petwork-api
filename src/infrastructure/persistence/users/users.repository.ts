import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from '../../../domain/users/user.model';
import { UserMapper } from '../../mappers/user.mapper';

export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(_id: string): Promise<User | undefined> {
    const userEntity = await this.usersRepository.findOne(_id);

    if (userEntity instanceof UserEntity) {
      return UserMapper.toDomain(userEntity);
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
