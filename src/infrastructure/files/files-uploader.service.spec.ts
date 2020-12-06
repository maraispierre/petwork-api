import { IFilesUploaderInterface } from './files-uploader.interface';
import { FilesUploader } from './files-uploader.service';
import { AwsS3FilesUploader } from './aws-s3-files-uploader.impl.service';
import { File } from '../../domain/files/file.model';
import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs';
import { AwsS3Error } from './aws-s3.error';
import { FilesUploaderError } from './files-uploader.error';

describe('FilesUploader', () => {
  let filesUploaderImpl: IFilesUploaderInterface;
  let filesUploader: FilesUploader;

  const FILE: FileUpload = {
    filename: '',
    mimetype: '',
    encoding: '',
    createReadStream(): ReadStream {
      return new ReadStream();
    },
  };

  beforeEach(async () => {
    filesUploaderImpl = new AwsS3FilesUploader();
    filesUploader = new FilesUploader(filesUploaderImpl);
  });

  describe('upload', () => {
    it('should return File', async () => {
      const uploadedFileMock = new File('test', 'test', 'test', 0);
      jest
        .spyOn(filesUploaderImpl, 'upload')
        .mockImplementation(async () => uploadedFileMock);

      const uploadedFile = await filesUploader.upload(FILE);

      expect(uploadedFile).toEqual(uploadedFileMock);
    });

    it('should throw FilesUploaderError', async () => {
      jest.spyOn(filesUploaderImpl, 'upload').mockImplementation(() => {
        throw new AwsS3Error();
      });

      await expect(filesUploader.upload(FILE)).rejects.toThrowError(
        FilesUploaderError,
      );
    });
  });
});
