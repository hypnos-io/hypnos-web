import { SupervisorService } from "../../services/supervisor_service";

export class DeleteSupervisor {
  constructor(private readonly supervisorService: SupervisorService) {}

  async execute(id: string): Promise<void>{

    await this.supervisorService.delete(id);

  }
}