import { io } from "socket.io-client";

export function connectWS(url) {
  return new Promise((resolve, reject) => {
    const socket = io(url);
    socket.on("connect", () => {
      resolve(socket);
    });

    socket.on("error", () => {
      reject();
    });
  });
}
