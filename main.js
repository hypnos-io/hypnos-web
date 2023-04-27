import { getCameras, open } from "./src/camera.js";
import "./style.css";
import { FindAll } from "./src/use_cases/workStations/FindAll.ts";
import WorkStationService from "./src/services/WorkStationService";

async function configureWorkstationCameras(workstations) {
  const allDevices = await getCameras();
  const deviceNames = allDevices.map((device) => {
    return `<option value="${device.deviceId}">${device.label}</option>`;
  });
  for (const workstation of workstations) {
    const videos = document.querySelector(".videos");
    videos.innerHTML += `
    <div data-id="${workstation}" class="video">
      <label>Posto de trabalho #${workstation}</label>
      <video class="camera" autoplay></video>
      <select data-id="${workstation}" class="select-camera secondary">
        <option selected disabled>Nenhuma câmera selecionada</option>
        ${deviceNames}
      </select>
    </div>
  `;
  }
}

function setEvents() {
  const cameraSelections = document.querySelectorAll(".video .select-camera");
  for (const cameraSelect of cameraSelections) {
    cameraSelect.addEventListener("change", (event) => {
      const { value: deviceId } = event.target;
      const video = document.querySelector(
        `.videos .video[data-id='${cameraSelect.dataset.id}'] .camera`
      );
      open(video, deviceId);
    });
  }
}

async function main() {
  const workStationService = new WorkStationService();
  const findAll = new FindAll(workStationService);
  const numStations = await findAll.execute();
  const stations = Array.from({ length: numStations }, (_, i) => i + 1);
  await configureWorkstationCameras(stations);
  setEvents();
  // const socket = await connectWS("http://localhost:3333");
}

main();
