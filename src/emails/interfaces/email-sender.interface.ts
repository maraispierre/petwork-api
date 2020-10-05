export interface EmailSenderInterface {
  sendEmail(templateId: number, receiver: string): Promise<void>;
}
