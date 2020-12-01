import { Injectable } from '@nestjs/common';
import { IFilesUploaderInterface } from './files-uploader.interface';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.service';
import { FileUpload } from 'graphql-upload';
import { File } from '../../domain/files/file.model';

@Injectable()
export class FilesUploader implements IFilesUploaderInterface {
  constructor(private readonly filesUploader: AwsS3FilesUploader) {}

  async upload(file: FileUpload): Promise<File> {
    return await this.filesUploader.upload(file);
  }
}
