import { Module } from '@nestjs/common';
import { UsersRepositoryModule } from './users/users.repository.module';

@Module({
  imports: [UsersRepositoryModule],
  exports: [UsersRepositoryModule],
})
export class PersistenceModule {}
