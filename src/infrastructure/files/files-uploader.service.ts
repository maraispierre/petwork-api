import { Injectable } from '@nestjs/common';
import { IFilesUploaderInterface } from './files-uploader.interface';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.service';

@Injectable()
export class FilesUploader implements IFilesUploaderInterface {
  constructor(private readonly filesUploader: AwsS3FilesUploader) {}

  async upload(dataBuffer: Buffer, filename: string) {
    await this.filesUploader.upload(dataBuffer, filename);
  }
}
