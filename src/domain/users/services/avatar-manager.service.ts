import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { FilesUploader } from '../../../infrastructure/files/files-uploader.service';
import { FileUpload } from 'graphql-upload';
import { PasswordUpdaterUnknownUserError } from './errors/password.updater.unknown.user.error';
import { AvatarManagerUnknownUserError } from './errors/avatar.manager.unknown.user.error';

@Injectable()
export class AvatarManager {
  public constructor(
    private usersRepository: UsersRepository,
    private readonly filesUploader: FilesUploader,
  ) {}

  public async updateAvatar(_id: string, avatar: FileUpload): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (!(user instanceof User)) {
      Logger.error(
        'AvatarManager : Impossible to update avatar, user not found',
      );
      throw new AvatarManagerUnknownUserError('Missing user with id :' + _id);
    }

    const uploadedAvatar = await this.filesUploader.upload(avatar);

    user.updateAvatar(uploadedAvatar);

    return this.usersRepository.save(user);
  }
}
