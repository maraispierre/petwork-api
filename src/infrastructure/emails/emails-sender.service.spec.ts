import { SendinBlueSender } from './sendin-blue-sender.impl.service';
import { EmailsSender } from './emails-sender.service';
import { IEmailsSender } from './emails-sender.interface';
import { SendinBlueApiError } from './sendin-blue-api.error';
import { EmailsSenderError } from './emails-sender.error';

describe('EmailsSender', () => {
  let emailsSenderImpl: IEmailsSender;
  let emailsSender: EmailsSender;

  beforeEach(async () => {
    emailsSenderImpl = new SendinBlueSender();
    emailsSender = new EmailsSender(emailsSenderImpl);
  });

  describe('sendEmail', () => {
    it('should send a email', async () => {
      jest.spyOn(emailsSenderImpl, 'sendEmail').mockImplementation();

      await emailsSender.sendEmail(EmailsSender.REGISTER_TEMPLATE_ID, 'test');
    });

    it('should throw EmailsSenderError', async () => {
      jest.spyOn(emailsSenderImpl, 'sendEmail').mockImplementation(() => {
        throw new SendinBlueApiError();
      });

      await expect(
        emailsSender.sendEmail(EmailsSender.REGISTER_TEMPLATE_ID, 'test'),
      ).rejects.toThrowError(EmailsSenderError);
    });
  });
});
