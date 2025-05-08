import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: mongoose.mongo.MongoError | mongoose.Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
