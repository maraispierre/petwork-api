import { User as UserEntity } from '../persistence/users/user.entity';
import { User } from '../../domain/users/user.model';
import { User as UserDTO } from '../../application/api/users/user.schema';
import { FileMapper } from './file.mapper';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity._id,
      userEntity.email,
      userEntity.password,
      userEntity.firstname,
      userEntity.lastname,
    );

    user.avatar = FileMapper.toDomain(userEntity.avatar);

    return user;
  }

  public static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
    );

    userEntity.avatar = FileMapper.toDomain(user.avatar);

    return userEntity;
  }

  public static toDTO(user: User): UserDTO {
    const userDTO = new UserDTO(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
    );

    userDTO.avatar = FileMapper.toDTO(user.avatar);

    return userDTO;
  }
}
