import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { EmailsModule } from './emails/emails.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [PersistenceModule, EmailsModule, FilesModule],
  exports: [PersistenceModule, EmailsModule, FilesModule],
})
export class InfrastructureModule {}
