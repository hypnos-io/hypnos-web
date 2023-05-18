import { LeaderService } from '../../services/leader_service'
import { RolesEnum } from '../authorization/roles';

export class CreateLeader {
  constructor(private readonly leadersService: LeaderService) {}

  async execute(registration: string,
    name: string,
    password: string,
    role: RolesEnum,
    imageURL: string) {

    const createdLeaders = await this.leadersService.create(registration, name, password, role, 
      imageURL);
    return createdLeaders;
  }

  async uploadImg(imageURL) {

    return this.leadersService.uploadToCloudinary(imageURL);

  }

}
