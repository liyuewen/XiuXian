import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import SocketResultFormat from 'src/common/format/socketResult';

@Injectable()
export class SocketFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const event = data.event;
        delete data.event;
        const result = data;
        return SocketResultFormat.result({
          data: result,
          event: event,
        });
      }),
    );
  }
}
