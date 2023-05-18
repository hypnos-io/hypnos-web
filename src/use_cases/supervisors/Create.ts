import { SupervisorService } from '../../services/supervisor_service'
import { RolesEnum } from '../authorization/roles';

export class CreateSupervisor {
  constructor(private readonly supervisorService: SupervisorService) {}

  async execute(registration: string,
    name: string,
    password: string,
    role: RolesEnum,
    imageURL: string) {

    const createdSupervisor = await this.supervisorService.create(registration, name, password, role, 
      imageURL);
    return createdSupervisor;
  }

  async uploadImg(imageURL) {

    return this.supervisorService.uploadToCloudinary(imageURL);

  }

}
