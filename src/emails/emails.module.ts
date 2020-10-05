import { Module } from '@nestjs/common';
import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';

const emailSenderInterface = {
  provide: 'EmailSenderInterface',
  useClass: SendinBlueSender,
};

@Module({
  providers: [EmailsSender, emailSenderInterface],
  exports: [EmailsSender],
})
export class EmailsModule {}
