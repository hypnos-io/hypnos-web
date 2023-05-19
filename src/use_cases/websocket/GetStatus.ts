import { Workstation } from '../../entities/workstation';
import { WebSocketService, Callback } from '../../services/websocket_service';
import { Socket} from 'socket.io-client';

export class OnWorkstationStatus {
  private socketService: WebSocketService;

  constructor() {
    this.socketService = new WebSocketService();
  }

  async listen(socket: Socket, workstation: Workstation, callback: Callback) {
    try {
      this.socketService.onWorkstationStatus(socket, workstation, callback);
    } catch (error) {
      console.error('Error connecting and listening Websocket:', error);
    }
  }
}
