import { Workstation } from '../../entities/workstation';
import { WebSocketService, Callback } from '../../services/websocket_service';

export class ConnectSocket {
  private socketService: WebSocketService;

  constructor() {
    this.socketService = new WebSocketService();
  }

  async connect() {
    try {
      return this.socketService.connect();
    } catch (error) {
      console.error('Error connecting and listening Websocket:', error);
    }
  }
}