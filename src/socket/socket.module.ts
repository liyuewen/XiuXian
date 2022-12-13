import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Global()
@Module({
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
