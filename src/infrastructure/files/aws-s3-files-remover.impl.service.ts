import { config, S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import { File } from '../../domain/files/file.model';
import { IFilesRemoverInterface } from './files-remover.interface';
import { AwsS3Error } from './aws-s3.error';

dotenv.config();

@Injectable()
export class AwsS3FilesRemover implements IFilesRemoverInterface {
  public constructor() {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  public async remove(file: File): Promise<File> {
    const s3 = new S3();
    try {
      const key = `${file._id}-${file.name}`;
      await s3
        .deleteObject({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? '',
          Key: key,
        })
        .promise();

      return file;
    } catch (error) {
      Logger.error(
        'AwsS3FilesRemover : Error when remove file from AWS S3 : ' +
          error.message,
      );
      throw new AwsS3Error(
        'AwsS3FilesRemover : Error when remove file from AWS S3',
      );
    }
  }
}
