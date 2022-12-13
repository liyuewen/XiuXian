import * as WebSocket from 'ws';
import {
  WebSocketAdapter,
  INestApplicationContext,
  WsMessageHandler,
} from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

export default class WsAdapters implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}

  create(port: number, options?: any) {
    return new WebSocket.Server({ port, ...options });
  }

  bindClientConnect(server: WebSocket.Server, callback?: () => void) {
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data: WebSocket.MessageEvent) =>
          this.bindMessageHandler(data, handlers, process),
        ),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer: WebSocket.MessageEvent,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    const data = buffer.data.toString();
    const message = JSON.parse(data);
    const messageHandler = handlers.find(
      (handler) => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server: WebSocket.Server) {
    server.close();
  }
}
