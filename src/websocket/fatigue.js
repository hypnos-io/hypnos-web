import { connect } from "./connection";

const socket = connect("http://localhost:3000");

let mockClientInfo = {
  employeeId: "6414fae6e7b86cadff2554af",
  workstation: "001",
};

socket.on("connect", () => {
  console.log("Conectado ao servidor websocket");
  let id = `MOCK_CLIENTID_${socket.id}`;
  mockClientInfo.id = id;

  socket.on(`notify-status:user-${id}`, onStatus);
});

export function sendImage(images = []) {
  console.log(`[WS] Enviando dados para a Hypnos API`);
  socket.emit("process-image", {
    ...mockClientInfo,
    images,
  });
}

export function onStatus(response) {
  console.log(`[WS] Recebendo status de fadiga`);
  console.log(response);
}

export function sendFakeStatus() {
  const reponse = {
    ...mockClientInfo,
    imageStatus: {
      detection: {
        eyes: {},
        mouth: {},
        head: {},
      },
      kssScale: 7,
    },
  };
  socket.emit("notify-status", reponse);
}
