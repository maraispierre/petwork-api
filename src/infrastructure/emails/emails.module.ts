import { Module } from '@nestjs/common';
import { SendinBlueSender } from './sendin-blue-sender.impl.service';
import { EmailsSender } from './emails-sender.service';

@Module({
  providers: [EmailsSender, SendinBlueSender],
  exports: [EmailsSender],
})
export class EmailsModule {}
