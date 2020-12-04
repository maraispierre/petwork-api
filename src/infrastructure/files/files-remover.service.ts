import { Injectable, Logger } from '@nestjs/common';
import { File } from '../../domain/files/file.model';
import { IFilesRemoverInterface } from './files-remover.interface';
import { AwsS3FilesRemover } from './aws-s3-files-remover.service';

@Injectable()
export class FilesRemover implements IFilesRemoverInterface {
  constructor(private readonly filesRemover: AwsS3FilesRemover) {}

  async remove(file: File): Promise<File> {
    Logger.log('FilesRemover: Remove file ' + file._id);
    return await this.filesRemover.remove(file);
  }
}
