import {WorkstationService} from '../../services/workstation_service'

export class FetchAllBySector {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute(sectorId: string) {
    return this.workstationService.fetchAllBySector(sectorId)
  }
}
