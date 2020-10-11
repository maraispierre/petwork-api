import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';

describe('EmailsSender', () => {
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
  });
});
