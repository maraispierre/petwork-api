import { Module } from '@nestjs/common';
import { UsersRepositoryModule } from './users/users.repository.module';
import { FilesRepositoryModule } from './files/files.repository.module';

@Module({
  imports: [UsersRepositoryModule, FilesRepositoryModule],
  exports: [UsersRepositoryModule, FilesRepositoryModule],
})
export class PersistenceModule {}
