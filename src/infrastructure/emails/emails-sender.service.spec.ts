import { SendinBlueSender } from './sendin-blue-sender.service';
import { EmailsSender } from './emails-sender.service';
import { EmailSender } from './email.sender.interface';

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
  });
});
