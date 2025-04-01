import fs from "fs";
import path from "path";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggingService {
  private logFilePath: string;

  constructor(logFilePath: string) {
    this.logFilePath = logFilePath || path.join(__dirname, "notifications.log");
  }

  logNotification(type: string, recipient: string, message: string): void {
    const logEntry = `${new Date().toISOString()} | ${type} | To: ${recipient} | Message: ${message}\n`;

    fs.appendFile(this.logFilePath, logEntry, (err) => {
      if (err) {
        console.error("Failed to log notification:", err);
      }
    });
  }
}
