import { getCameras, open } from "./src/camera.js";
import { connectWS } from "./src/websocket/connection.js";
import { sendImage } from "./src/websocket/fatigue.js";
import "./style.css";

async function configureWorkstationCameras(workstations) {
  const allDevices = await getCameras();
  const deviceNames = allDevices.map((device) => {
    return `<option value="${device.deviceId}">${device.label}</option>`;
  });
  for (const workstation of workstations) {
    const videos = document.querySelector(".videos");
    videos.innerHTML += `
    <div data-id="${workstation.value}" class="video">
      <label>Posto de trabalho #${workstation.value}</label>
      <video class="camera" autoplay></video>
      <select data-id="${workstation.value}" class="select-camera secondary">
        <option selected disabled>Nenhuma câmera selecionada</option>
        ${deviceNames}
      </select>
    </div>
  `;
  }
}

// employeeId: workstation.employee._id,
// fps: 10,
// id: socket.id,
// images,
// workstation: workstation.value,

const images = {};

function onFrame(video, workstationName, socket) {
  if (images[workstationName].length >= 10) {
    sendImage(
      socket,
      {
        employeeId: "2",
        fps: 10,
        id: "workstations-" + workstationName,
        workstation: workstationName,
      },
      images[workstationName]
    );
    console.log(images[workstationName]);
    images[workstationName] = [];
  }

  if (!video.srcObject) return;
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const buffer = canvas.toDataURL("image/png"); // Transforma imagem em base64
  images[workstationName].push(buffer);
}

function setEvents(socket) {
  const cameraSelections = document.querySelectorAll(".video .select-camera");
  for (const cameraSelect of cameraSelections) {
    cameraSelect.addEventListener("change", (event) => {
      const { value: deviceId } = event.target;
      const video = document.querySelector(
        `.videos .video[data-id='${cameraSelect.dataset.id}'] .camera`
      );
      open(video, deviceId);
      setInterval(() => onFrame(video, cameraSelect.dataset.id, socket), 100);
    });
  }
}

async function main() {
  const response = await fetch("http://localhost:3000/workstations");
  const workstations = await response.json();

  workstations.forEach((w) => {
    images[w.value] = [];
  });

  await configureWorkstationCameras(workstations);
  const socket = await connectWS("http://localhost:3000");
  setEvents(socket);
}

main();
