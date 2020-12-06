import { File } from '../../domain/files/file.model';
import { AwsS3Error } from './aws-s3.error';
import { IFilesRemoverInterface } from './files-remover.interface';
import { FilesRemover } from './files-remover.service';
import { AwsS3FilesRemover } from './aws-s3-files-remover.impl.service';
import { FilesRemoverError } from './files-remover.error';

describe('FilesRemover', () => {
  let filesRemoverImpl: IFilesRemoverInterface;
  let filesRemover: FilesRemover;

  const FILE = new File('test', 'test', 'test', 0);

  beforeEach(async () => {
    filesRemoverImpl = new AwsS3FilesRemover();
    filesRemover = new FilesRemover(filesRemoverImpl);
  });

  describe('remove', () => {
    it('should return File', async () => {
      const removedFileMock = new File('test', 'test', 'test', 0);
      jest
        .spyOn(filesRemoverImpl, 'remove')
        .mockImplementation(async () => removedFileMock);

      const removedFile = await filesRemover.remove(FILE);

      expect(removedFile).toEqual(removedFileMock);
    });

    it('should throw FilesRemoverError', async () => {
      jest.spyOn(filesRemoverImpl, 'remove').mockImplementation(() => {
        throw new AwsS3Error();
      });

      await expect(filesRemover.remove(FILE)).rejects.toThrowError(
        FilesRemoverError,
      );
    });
  });
});
