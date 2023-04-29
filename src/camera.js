export const FPS = 10;

export async function open(video, deviceId, onFrame) {
  const mediaDevices = navigator.mediaDevices;
  if (!mediaDevices || !mediaDevices.getUserMedia)
    throw new Error("getUserMedia() not supported.");

  const videoStream = await mediaDevices.getUserMedia({
    video: {
      deviceId,
    },
  });
  video.srcObject = videoStream;
}

export async function getCameras() {
  if (!navigator.mediaDevices?.enumerateDevices)
    throw new Error("enumerateDevices() not supported.");

  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = devices.filter((device) => device.kind === "videoinput");
  return videoInputs;
}
