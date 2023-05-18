import {CameraService} from '../../services/camera_service'

export class FetchAll {
  constructor(private readonly cameraService: CameraService) {}

  async execute() {
    return this.cameraService.fetchAll()
  }
}
