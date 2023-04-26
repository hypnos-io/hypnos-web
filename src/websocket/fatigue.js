export function sendImage(socket, clientInfo = {}, images = []) {
  console.log(`[WS] Enviando dados para a Hypnos API`);
  console.log(images);
  socket.emit("process-image", {
    ...clientInfo,
    images,
  });
}
