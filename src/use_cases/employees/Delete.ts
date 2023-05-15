import { EmployeeService } from "../../services/employee_service";

export class Delete {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(id: string): Promise<void>{

    await this.employeeService.delete(id);

  }
}