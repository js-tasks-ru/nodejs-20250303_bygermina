import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const executionTime = Date.now() - startTime;

        return {
          ...data,
          apiVersion: "1.0",
          executionTime: `${executionTime}ms`,
        };
      }),
    );
  }
}
