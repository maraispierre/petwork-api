import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';
import { SendinBlueApiError } from './sendin.blue.api.error';

describe('SendinBlueSender', () => {
  let sendinBlueSender: SendinBlueSender;

  beforeEach(async () => {
    sendinBlueSender = new SendinBlueSender();
  });

  describe('sendEmail', () => {
    it('should send a email', async () => {
      await sendinBlueSender.sendEmail(
        EmailsSender.REGISTER_TEMPLATE_ID,
        'piemarais@gmail.com',
      );
    });

    it('should throw SendinBlueApiError', async () => {
      await expect(
        sendinBlueSender.sendEmail(EmailsSender.REGISTER_TEMPLATE_ID, 'test'),
      ).rejects.toThrowError(SendinBlueApiError);
    });
  });
});
