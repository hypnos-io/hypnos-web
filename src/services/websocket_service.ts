import { Socket, io } from 'socket.io-client';
import { VITE_WS_SERVER_URL } from '../constants';
import { Workstation } from '../entities/workstation';
import { FatigueStatus } from '../entities/fatigue';

export type Image = string;

interface SocketData {
  id: string | undefined;
  employeeId: string;
  workstation: string;
  fps: number;
}

export interface SocketDataRequest extends SocketData {
  images: Image[];
}

export interface SocketDataResponse extends SocketData {
  imageStatus: FatigueStatus;
}

export type Callback = (data: SocketDataResponse) => void;

export class WebSocketService {
  private socket: Socket;

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket = io(VITE_WS_SERVER_URL);

      socket.on('connect', () => {
        this.socket = socket;
        resolve(socket);
      });

      socket.on('error', () => {
        reject();
      });
    });
  }

  onWorkstationStatus(workstation: Workstation, callback: Callback) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket.on(`notify-status:workstation-${workstation.value}`, callback);
  }

  sendWorkstationImage(images: Image[], workstation?: Workstation) {
    if (!workstation?.employee || !workstation.employee._id) return;

    const data: SocketDataRequest = {
      employeeId: workstation.employee._id,
      fps: 10,
      id: this.socket?.id,
      images,
      workstation: workstation.value,
    };
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket.emit('process-image', data);
  }
}
