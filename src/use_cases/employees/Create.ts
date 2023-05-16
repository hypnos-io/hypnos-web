import { EmployeeService } from '../../services/employee_service'
import { RolesEnum } from '../authorization/roles';

export class CreateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(registration: string,
    fullName: string,
    admissionDate: Date,
    role: Number,
    imageURL: string) {

    const createdEmployee = await this.employeeService.create(registration, fullName, admissionDate, role, 
      imageURL);
    return createdEmployee;
  }

  async uploadImg(imageURL) {

    return this.employeeService.uploadToCloudinary(imageURL);

  }

}
