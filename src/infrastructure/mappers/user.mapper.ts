import { UserEntity } from '../persistence/users/user.entity';
import { User } from '../../domain/users/user.model';
import { User as UserDTO } from '../../application/api/users/user.schema';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity._id,
      userEntity.email,
      userEntity.password,
      userEntity.firstname,
      userEntity.lastname,
    );
  }

  public static toPersistence(user: User): UserEntity {
    return new UserEntity(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
    );
  }

  public static toDTO(user: User): UserEntity {
    return new UserDTO(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
    );
  }
}
