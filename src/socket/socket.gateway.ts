import { UseInterceptors } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppConfig } from 'src/config/app.config';
import { SocketFormatInterceptor } from 'src/interceptor/socketFormat/socketFormat.interceptor';
import * as WebSocket from 'ws';
import { SocketService } from './socket.service';

interface ScoketData<T = any> {
  token: string;
}

@WebSocketGateway(AppConfig.ws.port, {
  path: AppConfig.ws.path,
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  constructor(private socketService: SocketService) {}

  @WebSocketServer()
  server: WebSocket.Server;

  @UseInterceptors(new SocketFormatInterceptor())
  @SubscribeMessage('connect')
  onMessage(client: WebSocket.Server, payload: ScoketData) {
    this.socketService.socketMap.set(payload.token, client);
    return {
      event: 'connect',
      data: '连接成功',
    };
  }
}
