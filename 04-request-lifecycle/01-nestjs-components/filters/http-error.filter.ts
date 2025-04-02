import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message || "Internal server error",
    };

    const logMessage = `[${new Date().toISOString()}] ${status} - ${exception.message || "Internal server error"}\n`;
    const logFilePath = "errors.log";
    fs.appendFileSync(logFilePath, logMessage);

    response.status(status).json(errorResponse);
  }
}
