import { Injectable, Logger } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { IEmailsSender } from './emails-sender.interface';
import { SendinBlueApiError } from './sendin-blue-api.error';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SendinBlueSender implements IEmailsSender {
  public constructor() {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDIN_BLUE_API_KEY;
  }

  public async sendEmail(templateId: number, receiver: string): Promise<void> {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendEmail = new SibApiV3Sdk.SendEmail();

    sendEmail.emailTo = [receiver];

    try {
      await apiInstance.sendTemplate(templateId, sendEmail);
    } catch (error) {
      Logger.error(
        'SendinBlueSender : Impossible to send email, SendinBlue API throws error : ' +
          error.message,
      );
      throw new SendinBlueApiError(
        'SendinBlueSender : Error when application call SendinBlue API: email not send',
      );
    }
  }
}
