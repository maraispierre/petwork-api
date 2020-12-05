import { File as FileEntity } from '../persistence/files/files.entity';
import { File as FileDTO } from '../../application/api/files/file.schema';
import { File } from '../../domain/files/file.model';

export class FileMapper {
  public static toDomain(fileEntity: FileEntity): File {
    return new File(
      fileEntity._id,
      fileEntity.name,
      fileEntity.uri,
      fileEntity.size,
    );
  }

  public static toPersistence(file: File): FileEntity {
    return new FileEntity(file._id, file.name, file.uri, file.size);
  }

  public static toDTO(file: File): FileDTO {
    return new FileDTO(file._id, file.name, file.uri, file.size);
  }
}
