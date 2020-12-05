import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { File } from '../../files/file.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { FilesUploader } from '../../../infrastructure/files/files-uploader.service';
import { FileUpload } from 'graphql-upload';
import { AvatarManagerUnknownUserError } from './errors/avatar.manager.unknown.user.error';
import { FilesRemover } from '../../../infrastructure/files/files-remover.service';
import { AvatarManagerUploadedFileError } from './errors/avatar.manager.uploaded.file.error';

@Injectable()
export class AvatarManager {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesUploader: FilesUploader,
    private readonly filesRemover: FilesRemover,
  ) {}

  public async update(_id: string, avatar: FileUpload): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (!(user instanceof User)) {
      Logger.error(
        'AvatarManager : Impossible to update avatar, user not found',
      );
      throw new AvatarManagerUnknownUserError(
        'AvatarManager : Missing user with id :' + _id,
      );
    }

    try {
      const uploadedAvatar = await this.filesUploader.upload(avatar);

      if (user.avatar instanceof File) {
        try {
          await this.filesRemover.remove(user.avatar);
        } catch (error) {
          Logger.warn(
            'AvatarManager : Impossible to remove file with id ' +
              user.avatar._id,
          );
        }
      }

      user.updateAvatar(uploadedAvatar);
    } catch (error) {
      throw new AvatarManagerUploadedFileError(
        'AvatarManager : Impossible to update avatar, file upload failed',
      );
    }

    return this.usersRepository.save(user);
  }
}
