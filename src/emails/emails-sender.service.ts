import { Inject, Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { EmailSenderInterface } from './interfaces/email-sender.interface';
import { SendinBlueSender } from './sendin-blue-sender.service';

@Injectable()
export class EmailsSender implements EmailSenderInterface {
  constructor(
    @Inject('EmailSenderInterface')
    private readonly concreteEmailSender: EmailSenderInterface,
  ) {}

  async sendEmail(templateId: number, receiver: string): Promise<void> {
    return await this.concreteEmailSender.sendEmail(templateId, receiver);
  }
}
