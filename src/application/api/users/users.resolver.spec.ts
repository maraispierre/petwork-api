import { ProfileInput } from './inputs/profile.input';
import { RegisterInput } from './inputs/register.input';
import { UsersResolver } from './users.resolver';
import { User } from '../../../domain/users/user.model';
import { Register } from '../../../domain/users/services/register.service';
import { ProfileDisplayer } from '../../../domain/users/services/profile-displayer.service';
import { ProfileUpdater } from '../../../domain/users/services/profile-updater.service';
import { Suspender } from '../../../domain/users/services/suspender.service';
import { PasswordUpdater } from '../../../domain/users/services/password-updater.service';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { EmailsSender } from '../../../infrastructure/emails/emails-sender.service';
import { AvatarManager } from '../../../domain/users/services/avatar-manager.service';
import { FilesUploader } from '../../../infrastructure/files/files-uploader.service';
import { FilesRemover } from '../../../infrastructure/files/files-remover.service';
import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs';

describe('UsersResolver', () => {
  const _ID = 'test';
  const EMAIL = 'email';
  const PASSWORD = 'password';
  const FIRSTNAME = 'firstname';
  const LASTNAME = 'lastname';

  let usersResolver: UsersResolver;
  let usersRepository: UsersRepository;
  let emailsSender: EmailsSender;
  let filesUploader: FilesUploader;
  let filesRemover: FilesRemover;
  let register: Register;
  let profileDisplayer: ProfileDisplayer;
  let profileUpdater: ProfileUpdater;
  let suspender: Suspender;
  let passwordUpdater: PasswordUpdater;
  let avatarManager: AvatarManager;

  beforeEach(async () => {
    register = new Register(usersRepository, emailsSender);
    profileDisplayer = new ProfileDisplayer(usersRepository);
    profileUpdater = new ProfileUpdater(usersRepository);
    suspender = new Suspender(usersRepository);
    passwordUpdater = new PasswordUpdater(usersRepository);
    avatarManager = new AvatarManager(
      usersRepository,
      filesUploader,
      filesRemover,
    );
    usersResolver = new UsersResolver(
      register,
      profileDisplayer,
      profileUpdater,
      suspender,
      passwordUpdater,
      avatarManager,
    );
  });

  describe('register', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(register, 'register').mockImplementation(async () => user);

      const registerInput = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      expect(await usersResolver.register(registerInput)).toEqual(user);
    });
  });

  describe('showProfile', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileDisplayer, 'show').mockImplementation(async () => user);

      expect(await usersResolver.showProfile(_ID)).toEqual(user);
    });
  });

  describe('updateProfile', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileUpdater, 'update').mockImplementation(async () => user);

      const profile = new ProfileInput(_ID, FIRSTNAME, LASTNAME);

      expect(await usersResolver.updateProfile(profile)).toEqual(user);
    });
  });

  describe('suspend', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(suspender, 'suspend').mockImplementation(async () => user);

      expect(await usersResolver.suspend(_ID)).toEqual(user);
    });
  });

  describe('updatePassword', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest
        .spyOn(passwordUpdater, 'update')
        .mockImplementation(async () => user);

      expect(await usersResolver.updatePassword(_ID, PASSWORD)).toEqual(user);
    });
  });

  describe('updateAvatar', () => {
    it('should return user', async () => {
      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      const file: FileUpload = {
        filename: '',
        mimetype: '',
        encoding: '',
        createReadStream(): ReadStream {
          return new ReadStream();
        },
      };

      jest.spyOn(avatarManager, 'update').mockImplementation(async () => user);

      expect(await usersResolver.updateAvatar(_ID, file)).toEqual(user);
    });
  });
});
