export interface IEmailsSender {
  sendEmail(templateId: number, receiver: string): Promise<void>;
}
