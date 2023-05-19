import { Socket } from 'socket.io-client';
import { Workstation } from '../../entities/workstation';
import { Image, WebSocketService } from '../../services/websocket_service';

export class SendWorkstationImages {
  private socketService: WebSocketService;

  constructor() {
    this.socketService = new WebSocketService();
  }

  async sendImagesWithConnection(socket: Socket, images: Image[], workstation: Workstation ) {
    try {
      this.socketService.sendWorkstationImage(socket, images, workstation);
    } catch (error) {
      console.error('Error connecting to WebSocket server:', error);
    }
  }
}
