import { Module } from '@nestjs/common';
import { FilesUploader } from './files-uploader.service';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.impl.service';
import { AwsS3FilesRemover } from './aws-s3-files-remover.impl.service';
import { FilesRemover } from './files-remover.service';

@Module({
  providers: [
    FilesUploader,
    FilesRemover,
    AwsS3FilesUploader,
    AwsS3FilesRemover,
  ],
  exports: [FilesUploader, FilesRemover],
})
export class FilesModule {}
