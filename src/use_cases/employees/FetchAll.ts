import { EmployeeService } from "../../services/employee_service";

export class FetchAllEmployees {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute() {
    const foundEmployees = await this.employeeService.fetchAll();
    return foundEmployees;
  }
}