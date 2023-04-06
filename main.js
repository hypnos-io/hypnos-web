import { open } from "./src/camera.js";
import { sendFakeStatus } from "./src/websocket/fatigue.js";
import "./style.css";

const openCameraButton = document.querySelector(".open-camera");
const simulateDrowsyReponse = document.querySelector(".send-status");

function main() {
  openCameraButton.addEventListener("click", open);
  simulateDrowsyReponse.addEventListener("click", sendFakeStatus);
}

main();
