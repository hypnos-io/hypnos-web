import { SupervisorService } from "../../services/supervisor_service";

export class FetchAllSupervisors {
  constructor(private readonly supervisorService: SupervisorService) {}

  async execute() {
    const foundSupervisors = await this.supervisorService.fetchAll();
    return foundSupervisors;
  }
}