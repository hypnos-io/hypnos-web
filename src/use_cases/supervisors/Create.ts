import { SupervisorService } from '../../services/supervisor_service'

export class CreateSupervisor {
  constructor(private readonly supervisorService: SupervisorService) {}

  async execute(registration: string,
    fullName: string,
    password: string,
    admissionDate: Date,
    role: Number,
    imageURL: string) {

    const createdSupervisor = await this.supervisorService.create(registration, fullName, password, admissionDate, role, 
      imageURL);
    return createdSupervisor;
  }

  async uploadImg(imageURL) {

    return this.supervisorService.uploadToCloudinary(imageURL);

  }

}
