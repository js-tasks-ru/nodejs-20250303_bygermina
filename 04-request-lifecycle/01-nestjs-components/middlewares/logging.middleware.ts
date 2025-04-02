import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on("finish", () => {
      const elapsedTime = Date.now() - startTime;
      console.log(`[${req.method}] ${req.url} - ${elapsedTime}ms`);
    });

    next();
  }
}
