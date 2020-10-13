import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';
import { EmailSender } from './email.sender.interface';
import { SendinBlueApiError } from './sendin.blue.api.error';
import { EmailSenderError } from './email.sender.error';

describe('EmailsSender', () => {
  let emailsSenderInterface: EmailSender;
  let emailsSender: EmailsSender;

  beforeEach(async () => {
    emailsSenderInterface = new SendinBlueSender();
    emailsSender = new EmailsSender(emailsSenderInterface);
  });

  describe('sendEmail', () => {
    it('should send a email', async () => {
      jest.spyOn(emailsSenderInterface, 'sendEmail').mockImplementation();

      await emailsSender.sendEmail(EmailsSender.REGISTER_TEMPLATE_ID, 'test');
    });

    it('should throw EmailSenderError', async () => {
      jest.spyOn(emailsSenderInterface, 'sendEmail').mockImplementation(() => {
        throw new SendinBlueApiError();
      });

      await expect(
        emailsSender.sendEmail(EmailsSender.REGISTER_TEMPLATE_ID, 'test'),
      ).rejects.toThrowError(EmailSenderError);
    });
  });
});
