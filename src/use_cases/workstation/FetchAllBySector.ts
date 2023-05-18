import {WorkstationService} from '../../services/workstation_service'

export class FecthAllBySector {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute(sectorId: string) {
    return this.workstationService.fecthAllBySector(sectorId)
  }
}
