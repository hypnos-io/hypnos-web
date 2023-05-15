import {WorkstationService} from '../../services/workstation_service'

export class FetchAll {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute() {
    const foundWorkstations = await this.workstationService.fetchAll();
    return foundWorkstations;
  }
}
