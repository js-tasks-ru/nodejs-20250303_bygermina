import { Injectable, BadRequestException } from "@nestjs/common";
import { LoggingService } from "../logging/logging.service";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly senderEmail: string,
    private readonly smsGateway: string,
  ) {}

  sendEmail(to: string, subject: string, message: string): void {
    if (!to || !subject || !message) {
      throw new BadRequestException("Invalid email data");
    }
    console.log(
      `Email sent from ${this.senderEmail} to ${to}: [${subject}] ${message}`,
    );

    this.loggingService.logNotification("Email", to, `[${subject}] ${message}`);
  }

  sendSMS(to: string, message: string): void {
    if (!to || !message) {
      throw new BadRequestException("Invalid SMS data");
    }
    console.log(`SMS sent via ${this.smsGateway} to ${to}: ${message}`);

    this.loggingService.logNotification("SMS", to, message);
  }
}
