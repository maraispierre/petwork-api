import { Repository } from 'typeorm';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { AvatarManager } from './avatar-manager.service';
import { FilesUploader } from '../../../infrastructure/files/files-uploader.service';
import { FilesRemover } from '../../../infrastructure/files/files-remover.service';
import { AwsS3FilesUploader } from '../../../infrastructure/files/aws-s3-files-uploader.impl.service';
import { AwsS3FilesRemover } from '../../../infrastructure/files/aws-s3-files-remover.impl.service';
import { File } from '../../files/file.model';
import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs';
import { AvatarManagerUnknownUserError } from './errors/avatar.manager.unknown.user.error';
import { FilesUploaderError } from '../../../infrastructure/files/files-uploader.error';
import { AvatarManagerUploadedFileError } from './errors/avatar.manager.uploaded.file.error';
import { FilesRemoverError } from '../../../infrastructure/files/files-remover.error';

describe('AvatarManager', () => {
  let usersRepository: UsersRepository;
  let filesUploader: FilesUploader;
  let filesRemover: FilesRemover;
  let avatarManager: AvatarManager;

  const FILE: FileUpload = {
    filename: '',
    mimetype: '',
    encoding: '',
    createReadStream(): ReadStream {
      return new ReadStream();
    },
  };

  const MOCKED_AVATAR = new File('test', 'test', 'test', 0);
  const MOCKED_USER = new User(
    'test',
    'test',
    'test',
    'test',
    'test',
    MOCKED_AVATAR,
  );
  const MOCKED_USER_WITHOUT_AVATAR = new User(
    'test',
    'test',
    'test',
    'test',
    'test',
  );
  beforeEach(async () => {
    usersRepository = new UsersRepository(new Repository<User>());
    filesUploader = new FilesUploader(new AwsS3FilesUploader());
    filesRemover = new FilesRemover(new AwsS3FilesRemover());
    avatarManager = new AvatarManager(
      usersRepository,
      filesUploader,
      filesRemover,
    );
  });

  describe('update', () => {
    it('should return an user after upload image', async () => {
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(filesUploader, 'upload')
        .mockImplementation(async () => MOCKED_AVATAR);
      jest
        .spyOn(filesRemover, 'remove')
        .mockImplementation(async () => MOCKED_AVATAR);

      const user = await avatarManager.update('', FILE);

      expect(user).toEqual(MOCKED_USER);
    });

    it('should return an user after upload image when user has not avatar before', async () => {
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => MOCKED_USER_WITHOUT_AVATAR);
      jest
        .spyOn(filesUploader, 'upload')
        .mockImplementation(async () => MOCKED_AVATAR);

      const user = await avatarManager.update('', FILE);

      expect(user).toEqual(MOCKED_USER);
    });

    it('should throw AvatarManagerUnknownUserError', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined);

      await expect(avatarManager.update('', FILE)).rejects.toThrowError(
        AvatarManagerUnknownUserError,
      );
    });

    it('should throw AvatarManagerUploadedFileError', async () => {
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => MOCKED_USER);
      jest.spyOn(filesUploader, 'upload').mockImplementation(async () => {
        throw new FilesUploaderError();
      });

      await expect(avatarManager.update('', FILE)).rejects.toThrowError(
        AvatarManagerUploadedFileError,
      );
    });

    it('should return an user when encounters an FilesRemoverError', async () => {
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => MOCKED_USER);
      jest
        .spyOn(filesUploader, 'upload')
        .mockImplementation(async () => MOCKED_AVATAR);
      jest.spyOn(filesRemover, 'remove').mockImplementation(async () => {
        throw new FilesRemoverError();
      });

      const user = await avatarManager.update('', FILE);

      expect(user).toEqual(MOCKED_USER);
    });
  });
});
