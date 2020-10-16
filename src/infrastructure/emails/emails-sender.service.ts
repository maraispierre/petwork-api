import { Injectable, Logger } from '@nestjs/common';
import { EmailSender } from './email.sender.interface';
import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailSenderError } from './email.sender.error';

@Injectable()
export class EmailsSender implements EmailSender {
  public static REGISTER_TEMPLATE_ID = 1;

  public constructor(private readonly emailSender: SendinBlueSender) {}

  public async sendEmail(templateId: number, receiver: string): Promise<void> {
    try {
      Logger.log('EmailSender : Send email to ' + receiver);
      await this.emailSender.sendEmail(templateId, receiver);
    } catch (error) {
      Logger.error('EmailSender : Impossible to send email : ' + error.message);
      throw new EmailSenderError(
        'EmailSender : Error when application try to send email : email not send',
      );
    }
  }
}
