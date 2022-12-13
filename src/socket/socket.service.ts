import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class SocketService {

  socketMap = new Map<string, WebSocket.Server>();

}