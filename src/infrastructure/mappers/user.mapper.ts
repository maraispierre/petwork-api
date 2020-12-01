import { User as UserEntity } from '../persistence/users/user.entity';
import { User } from '../../domain/users/user.model';
import { User as UserDTO } from '../../application/api/users/user.schema';
import { FileMapper } from './file.mapper';
import { File as FileEntity } from '../persistence/files/files.entity';
import { File } from '../../domain/files/file.model';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity._id,
      userEntity.email,
      userEntity.password,
      userEntity.firstname,
      userEntity.lastname,
      userEntity.avatar instanceof FileEntity
        ? FileMapper.toDomain(userEntity.avatar)
        : undefined,
    );
  }

  public static toPersistence(user: User): UserEntity {
    return new UserEntity(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
      user.avatar instanceof File
        ? FileMapper.toPersistence(user.avatar)
        : undefined,
    );
  }

  public static toDTO(user: User): UserDTO {
    return new UserDTO(
      user._id,
      user.email,
      user.password,
      user.firstname,
      user.lastname,
      user.avatar instanceof File ? FileMapper.toDTO(user.avatar) : undefined,
    );
  }
}
