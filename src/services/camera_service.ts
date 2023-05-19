import {Camera} from '../entities/camera'

export class CameraService {
  async fetchAll(): Promise<Camera[]> {
    if (!navigator.mediaDevices?.enumerateDevices)
      throw new Error('enumerateDevices() not supported.')

    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoInputs = devices.filter((device) => device.kind === 'videoinput')
    const cameras = videoInputs.map((video) => {
      const camera: Camera = {
        name: video.label,
        deviceId: video.deviceId,
      }
      return camera
    })
    return cameras
  }
}
