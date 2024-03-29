import { config, S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IFilesUploaderInterface } from './files-uploader.interface';
import { FileUpload } from 'graphql-upload';
import { File } from '../../domain/files/file.model';
import { AwsS3Error } from './aws-s3.error';

dotenv.config();

@Injectable()
export class AwsS3FilesUploader implements IFilesUploaderInterface {
  public constructor() {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  public async upload(file: FileUpload): Promise<File> {
    const s3 = new S3();
    try {
      const _id = uuid();
      const key = `${_id}-${file.filename}`;
      const body = file.createReadStream();
      const managedUpload = await s3
        .upload({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? '',
          Body: body,
          Key: key,
        })
        .promise();

      return new File(
        _id,
        file.filename,
        managedUpload.Location,
        body.bytesRead,
      );
    } catch (error) {
      Logger.error(
        'AwsS3FilesUploader : Error when upload file to AWS S3 : ' +
          error.message,
      );
      throw new AwsS3Error(
        'AwsS3FilesUploader : Error when upload file to AWS S3',
      );
    }
  }
}
