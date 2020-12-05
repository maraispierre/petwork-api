import { Injectable, Logger } from '@nestjs/common';
import { File } from '../../domain/files/file.model';
import { IFilesRemoverInterface } from './files-remover.interface';
import { AwsS3FilesRemover } from './aws-s3-files-remover.impl.service';
import { FilesRemoverError } from './files-remover.error';

@Injectable()
export class FilesRemover implements IFilesRemoverInterface {
  constructor(private readonly filesRemover: AwsS3FilesRemover) {}

  async remove(file: File): Promise<File> {
    Logger.log('FilesRemover: Remove file ' + file._id);
    try {
      return await this.filesRemover.remove(file);
    } catch (error) {
      throw new FilesRemoverError(
        'FilesRemover : Error when remove file ' + file._id,
      );
    }
  }
}
