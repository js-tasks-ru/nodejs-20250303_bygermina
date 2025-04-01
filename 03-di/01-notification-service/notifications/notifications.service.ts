import { Injectable, BadRequestException } from "@nestjs/common";
import { LoggingService } from "../logging/logging.service";

@Injectable()
export class NotificationsService {
  constructor(private readonly loggingnService: LoggingService) {}

  sendEmail(to: string, subject: string, message: string): void {
    if (!to || !subject || !message) {
      throw new BadRequestException("Invalid email data");
    }
    console.log(`Email sent to ${to}: [${subject}] ${message}`);

    this.loggingnService.logNotification(
      "Email",
      to,
      `[${subject}] ${message}`,
    );
  }

  sendSMS(to: string, message: string): void {
    if (!to || !message) {
      throw new BadRequestException("Invalid SMS data");
    }
    console.log(`SMS sent to ${to}: ${message}`);

    this.loggingnService.logNotification("SMS", to, message);
  }
}
