import {Socket, io} from 'socket.io-client'
import {WS_SERVER_URL} from '../../constants'

export function connect(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const socket = io(WS_SERVER_URL)
    socket.on('connect', () => {
      resolve(socket)
    })

    socket.on('error', () => {
      reject()
    })
  })
}
