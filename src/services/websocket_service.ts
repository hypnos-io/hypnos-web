import {Socket, io} from 'socket.io-client'
import {WS_SERVER_URL} from '../constants'
import {FatigueStatus} from '../entities/fatigue'
import {Workstation} from '../entities/workstation'

export type Image = string

interface SocketData {
  id: string | undefined
  employeeId: string
  workstation: string
  fps: number
}

export interface SocketDataRequest extends SocketData {
  images: Image[]
}

export interface SocketDataResponse extends SocketData {
  imageStatus: FatigueStatus
}

export const FPS = 10

export type Callback = (data: SocketDataResponse) => void

export class WebSocketService {
  private socket?: Socket

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket = io(WS_SERVER_URL)

      socket.on('connect', () => {
        this.socket = socket
        resolve(socket)
      })

      socket.on('error', () => {
        reject()
      })
    })
  }

  onWorkstationStatus(
    socket: Socket,
    workstation: Workstation,
    callback: Callback
  ) {
    socket.on(`notify-status:workstation-${workstation.value}`, (res) => {
      console.log(`[WS] Recebimento de status do posto`)
      console.log(res)
      callback(res)
    })
  }

  sendWorkstationImage(
    socket: Socket,
    images: Image[],
    workstation: Workstation
  ) {
    if (!workstation.employee || !workstation.employee._id) return
    console.log(`[WS] Enviando imagens de câmera ${workstation.cameraId}`)

    const data: SocketDataRequest = {
      employeeId: workstation.employee._id,
      fps: FPS,
      id: socket.id,
      images,
      workstation: workstation.value,
    }
    socket.emit('process-image', data)
  }
}
