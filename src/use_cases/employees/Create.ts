import { EmployeeService } from '../../services/employee_service'
import { RolesEnum } from '../authorization/roles';

export class CreateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(registration: string,
    name: string,
    role: RolesEnum,
    imageURL: string) {

    const createdEmployee = await this.employeeService.create(registration, name, role, imageURL);
    return createdEmployee;
  }

  async uploadImg(imageURL) {

    return this.employeeService.uploadToCloudinary(imageURL);

  }

}
