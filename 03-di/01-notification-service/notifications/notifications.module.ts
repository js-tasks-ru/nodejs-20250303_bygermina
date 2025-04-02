import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { LoggingService } from "../logging/logging.service";

@Module({
  providers: [
    {
      provide: "LOG_LEVEL",
      useValue: "debug",
    },
    {
      provide: LoggingService,
      useFactory: (logLevel: string) => {
        return new LoggingService(logLevel);
      },
      inject: ["LOG_LEVEL"],
    },
    {
      provide: "SENDER_EMAIL",
      useValue: "no-reply@example.com",
    },
    {
      provide: "SMS_GATEWAY",
      useValue: "https://sms-gateway.example.com",
    },
    {
      provide: NotificationsService,
      useFactory: (
        loggingService: LoggingService,
        senderEmail: string,
        smsGateway: string,
      ) => {
        return new NotificationsService(
          loggingService,
          senderEmail,
          smsGateway,
        );
      },
      inject: [LoggingService, "SENDER_EMAIL", "SMS_GATEWAY"],
    },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
