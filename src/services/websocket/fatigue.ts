import {Socket} from 'socket.io-client'
import {FatigueStatus} from '../../entities/fatigue'
import {Workstation} from '../../entities/workstation'

type Image = string

interface SocketData {
  id: string
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

type Callback = (data: SocketDataResponse) => void

export function onWorkstationStatus(
  socket: Socket,
  workstation: Workstation,
  callback: Callback
) {
  socket.on(`notify-status:workstation-${workstation.value}`, callback)
}

export function sendWorkstationImage(
  socket: Socket,
  images: Image[],
  workstation: Workstation
) {
  if (!workstation.employee || !workstation.employee._id) return

  const data: SocketDataRequest = {
    employeeId: workstation.employee._id,
    fps: 10,
    id: socket.id,
    images,
    workstation: workstation.value,
  }
  socket.emit('process-image', data)
}
