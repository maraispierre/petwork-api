import { Injectable } from '@nestjs/common';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { FilesUploader } from '../../../infrastructure/files/files-uploader.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class AvatarManager {
  public constructor(
    private usersRepository: UsersRepository,
    private readonly filesUploader: FilesUploader,
  ) {}

  public async updateAvatar(_id: string, avatar: FileUpload): Promise<User> {
    return new User('', '', '', '', '');
  }
}
