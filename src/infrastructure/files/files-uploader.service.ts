import { Injectable, Logger } from '@nestjs/common';
import { IFilesUploaderInterface } from './files-uploader.interface';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.impl.service';
import { FileUpload } from 'graphql-upload';
import { File } from '../../domain/files/file.model';
import { FilesUploaderError } from './files-uploader.error';

@Injectable()
export class FilesUploader implements IFilesUploaderInterface {
  constructor(private readonly filesUploader: AwsS3FilesUploader) {}

  async upload(file: FileUpload): Promise<File> {
    Logger.log('FilesUploader: Upload file ' + file.filename);
    try {
      return await this.filesUploader.upload(file);
    } catch (error) {
      throw new FilesUploaderError(
        'FilesUploader : Error when upload file ' + file.filename,
      );
    }
  }
}
