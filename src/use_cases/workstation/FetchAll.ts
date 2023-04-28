import {WorkstationService} from '../../services/workstation_service'

export class FetchAll {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute() {
    return this.workstationService.fetchAll()
  }
}
