import { config, S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { FilesUploaderError } from './files-uploader.error';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IFilesUploaderInterface } from './files-uploader.interface';

dotenv.config();

@Injectable()
export class AwsS3FilesUploader implements IFilesUploaderInterface {
  constructor() {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async upload(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    try {
      await s3.upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? '',
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      });
    } catch (error) {
      Logger.error(
        'FilesUploaderService : Error when upload file to AWS S3 : ' +
          error.message,
      );
      throw new FilesUploaderError(
        'FilesUploaderService : Error when upload file to AWS S3',
      );
    }
  }
}
