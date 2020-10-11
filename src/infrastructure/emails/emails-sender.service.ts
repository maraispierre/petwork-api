import { Injectable } from '@nestjs/common';
import { EmailSender } from './email.sender.interface';
import { SendinBlueSender } from './sendin-blue-sender.service';

@Injectable()
export class EmailsSender implements EmailSender {
  public static REGISTER_TEMPLATE_ID = 1;

  public constructor(private readonly emailSender: SendinBlueSender) {}

  public async sendEmail(templateId: number, receiver: string): Promise<void> {
    return await this.emailSender.sendEmail(templateId, receiver);
  }
}
