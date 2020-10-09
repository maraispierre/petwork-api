import { Test, TestingModule } from '@nestjs/testing';
import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';
import { SubscriptionInput } from '../users/inputs/subscription.input';
import { User } from '../users/models/user.model';
import { ValidationError } from 'apollo-server-express';
import { EmailSenderInterface } from './interfaces/email-sender.interface';

describe('EmailsSender', () => {
  let emailsSenderInterface: EmailSenderInterface;
  let emailsSender: EmailsSender;

  beforeEach(async () => {
    emailsSenderInterface = new SendinBlueSender();
    emailsSender = new EmailsSender(emailsSenderInterface);
  });

  describe('sendEmail', () => {
    it('should send a email', async () => {
      jest.spyOn(emailsSenderInterface, 'sendEmail').mockImplementation();

      emailsSender.sendEmail(1, 'test');
    });
  });
});
