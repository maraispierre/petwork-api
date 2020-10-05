import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class SendinBlueSender {
  constructor() {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey =
      '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';
  }

  async sendEmail(templateId: number, receiver: string): Promise<void> {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendEmail = new SibApiV3Sdk.SendEmail();

    sendEmail.emailTo = ['piemarais@gmail.com'];

    try {
      await apiInstance.sendTemplate(templateId, sendEmail);
    } catch (e) {
      console.log(e);
    }
  }
}
