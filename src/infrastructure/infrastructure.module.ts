import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [PersistenceModule, EmailsModule],
  exports: [PersistenceModule, EmailsModule],
})
export class InfrastructureModule {}
