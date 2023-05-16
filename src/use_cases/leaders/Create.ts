import { LeaderService } from '../../services/leader_service'
import { RolesEnum } from '../authorization/roles';

export class CreateLeader {
  constructor(private readonly leadersService: LeaderService) {}

  async execute(registration: string,
    fullName: string,
    password: string,
    admissionDate: Date,
    role: Number,
    imageURL: string) {

    const createdLeaders = await this.leadersService.create(registration, fullName, password, admissionDate, role, 
      imageURL);
    return createdLeaders;
  }

  async uploadImg(imageURL) {

    return this.leadersService.uploadToCloudinary(imageURL);

  }

}
