import { sendImage } from "./websocket/fatigue";

const video = document.querySelector(".video");

async function open() {
  let allMediaDevices = navigator.mediaDevices;
  if (!allMediaDevices || !allMediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }
  allMediaDevices
    .getUserMedia({
      video: true,
    })
    .then(function (videoStream) {
      if ("srcObject" in video) {
        video.srcObject = videoStream;
      } else {
        video.src = window.URL.createObjectURL(videoStream);
      }
      video.onloadedmetadata = () => {
        video.play();
        capture(video);
      };
    })
    .catch((error) => {
      console.log(error.name + ": " + error.message);
    });
}

async function capture(video) {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL();
  sendImage([dataUrl]);
  setTimeout(() => capture(video), 1000);
}

export { open, capture };
