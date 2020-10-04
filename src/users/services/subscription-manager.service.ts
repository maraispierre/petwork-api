import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import * as SibApiV3Sdk from "sib-api-v3-sdk";

@Injectable()
export class SubscriptionManager {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async subscribe(subscription: SubscriptionInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(subscription.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = await User.subscribe(subscription);

    this.sendConfirmationEmail();

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string): Promise<boolean> {
    const users = await this.usersRepository.find({
      where: { email: email },
    });

    return users.length !== 0;
  }

  private async sendConfirmationEmail() : Promise<void> {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = "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"

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const templateId = 1;

    const sendEmail = new SibApiV3Sdk.SendEmail();// SendEmail |

    sendEmail.emailTo = ['piemarais@gmail.com'];

    apiInstance.sendTemplate(templateId, sendEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
  }
}
