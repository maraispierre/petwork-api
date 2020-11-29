import { Module } from '@nestjs/common';
import { FilesUploader } from './files-uploader.service';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.service';

@Module({
  providers: [FilesUploader, AwsS3FilesUploader],
  exports: [FilesUploader],
})
export class FilesModule {}
