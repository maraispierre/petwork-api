import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File as FileEntity } from './files.entity';
import { File } from '../../../domain/files/file.model';
import { FileMapper } from '../../mappers/file.mapper';

export class FilesRepository {
  public constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
  ) {}

  public async findOne(_id: string): Promise<File | undefined> {
    const fileEntity = await this.filesRepository.findOne(_id);

    if (fileEntity instanceof FileEntity) {
      return FileMapper.toDomain(fileEntity);
    }

    return undefined;
  }

  public async save(file: File): Promise<File> {
    const fileEntity = await this.filesRepository.save(
      FileMapper.toPersistence(file),
    );

    return FileMapper.toDomain(fileEntity);
  }
}
