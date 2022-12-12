import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext, WsMessageHandler } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

export default class WsAdapters implements WebSocketAdapter {

  constructor(private app: INestApplicationContext) {}

  create(port: number, options?: any) {
    // return new ws.Server({ port, ...options });
  }
  bindClientConnect(server: any, callback: Function) {
    throw new Error("Method not implemented.");
  }
  bindClientDisconnect?(client: any, callback: Function) {
    throw new Error("Method not implemented.");
  }
  bindMessageHandlers(client: any, handlers: WsMessageHandler<string>[], transform: (data: any) => Observable<any>) {
    throw new Error("Method not implemented.");
  }
  close(server: any) {
    throw new Error("Method not implemented.");
  }
 
  
  
}