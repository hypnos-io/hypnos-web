import {Socket, io} from 'socket.io-client'
import {VITE_WS_SERVER_URL} from '../../constants'

export async function connect(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const socket = io(VITE_WS_SERVER_URL)
    socket.on('connect', () => {
      resolve(socket)
    })

    socket.on('error', () => {
      reject()
    })
  })
}
