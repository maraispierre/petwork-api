import { Injectable } from '@nestjs/common';
import { IFilesUploaderInterface } from './files-uploader.interface';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class FilesUploader implements IFilesUploaderInterface {
  constructor(private readonly filesUploader: AwsS3FilesUploader) {}

  async upload(file: FileUpload) {
    await this.filesUploader.upload(file);
  }
}
