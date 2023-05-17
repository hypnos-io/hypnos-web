import { Workstation } from '../../entities/workstation';
import { Image, WebSocketService } from '../../services/websocket_service';

export class SendWorkstationImages {
  private socketService: WebSocketService;

  constructor() {
    this.socketService = new WebSocketService();
  }

  async sendImagesWithConnection(images: Image[], workstation: Workstation) {
    try {
      const socket = await this.socketService.connect();
      this.socketService.sendWorkstationImage(images, workstation);
    } catch (error) {
      console.error('Error connecting to WebSocket server:', error);
    }
  }
}
