import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'

export class Create {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute(
    sectorId: string,
    newWorkstations: Omit<
      Workstation,
      '_id' | 'createdAt' | 'updatedAt' | 'employee' | 'sector'
    >
  ) {
    return this.workstationService.create(sectorId, newWorkstations)
  }
}
