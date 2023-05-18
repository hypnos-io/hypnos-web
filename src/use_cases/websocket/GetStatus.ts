import { Workstation } from '../../entities/workstation';
import { WebSocketService, Callback } from '../../services/websocket_service';

export class OnWorkstationStatus {
  private socketService: WebSocketService;

  constructor() {
    this.socketService = new WebSocketService();
  }

  async connectAndListen(workstation: Workstation, callback: Callback) {
    try {
      const socket = await this.socketService.connect();
      this.socketService.onWorkstationStatus(workstation, callback);
    } catch (error) {
      console.error('Error connecting and listening Websocket:', error);
    }
  }
}
