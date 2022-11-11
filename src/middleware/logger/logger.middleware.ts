import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import LoggerCommon from 'src/common/logger/logger.service';
import Utils from 'src/utils/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const ip = Utils.getIp(req);
    const request = {
      method: req.method,
      url: req.url,
      ip,
      params: req.params,
      query: req.query,
      body: req.body,
    };
    LoggerCommon.info(JSON.stringify(request));
    next();
  }
}
