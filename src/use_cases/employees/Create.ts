import { EmployeeService } from '../../services/employee_service'
import { RolesEnum } from '../authorization/roles';

export class Create {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(registration: string,
    fullName: string,
    password: string,
    admissionDate: Date,
    role: Number,
    profileImage: string) {

    const createdEmployee = await this.employeeService.create(registration, fullName, password, admissionDate, role, 
      profileImage);
    return createdEmployee;
  }

  async uploadImg(imageURL) {

    return this.employeeService.uploadToCloudinary(imageURL);

  }

}
