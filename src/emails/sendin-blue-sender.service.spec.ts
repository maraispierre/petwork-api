import { Test, TestingModule } from '@nestjs/testing';
import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';
import { SubscriptionInput } from '../users/inputs/subscription.input';
import { User } from '../users/models/user.model';
import { ValidationError } from 'apollo-server-express';
import { EmailSenderInterface } from './interfaces/email-sender.interface';

describe('EmailsSender', () => {
  let sendinBlueSender: SendinBlueSender;

  beforeEach(async () => {
    sendinBlueSender = new SendinBlueSender();
  });

  describe('sendEmail', () => {
    it('should send a email', async () => {
      sendinBlueSender.sendEmail(1, 'test');
    });

    it('should return an exception', async () => {
      expect(sendinBlueSender.sendEmail(1, 'test')).rejects.toThrowError(Error);
    });
  });
});
