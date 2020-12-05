import { Injectable, Logger } from '@nestjs/common';
import { IEmailsSender } from './emails-sender.interface';
import { SendinBlueSender } from './sendin-blue-sender.impl.service';
import { EmailsSenderError } from './emails-sender.error';

@Injectable()
export class EmailsSender implements IEmailsSender {
  public static REGISTER_TEMPLATE_ID = 1;

  public constructor(private readonly emailSender: SendinBlueSender) {}

  public async sendEmail(templateId: number, receiver: string): Promise<void> {
    try {
      Logger.log('EmailSender : Send email to ' + receiver);
      await this.emailSender.sendEmail(templateId, receiver);
    } catch (error) {
      Logger.error('EmailSender : Impossible to send email : ' + error.message);
      throw new EmailsSenderError(
        'EmailSender : Error when application try to send email : email not send',
      );
    }
  }
}
