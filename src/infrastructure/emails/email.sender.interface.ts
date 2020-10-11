export interface EmailSender {
  sendEmail(templateId: number, receiver: string): Promise<void>;
}
