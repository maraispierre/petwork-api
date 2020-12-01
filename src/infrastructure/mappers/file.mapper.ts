import { File as FileEntity } from '../persistence/files/files.entity';
import { File as FileDTO } from '../../application/api/files/file.schema';
import { File } from '../../domain/files/file.model';

export class FileMapper {
  public static toDomain(fileEntity: FileEntity): File {
    return new File(fileEntity._id, fileEntity.location);
  }

  public static toPersistence(file: File): FileEntity {
    return new FileEntity(file._id, file.location);
  }

  public static toDTO(user: File): FileDTO {
    return new FileDTO(user._id, user.location);
  }
}
