import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'

export type WorkstationUpdateRequest = Partial<
  Omit<
    Workstation,
    '_id' | 'createdAt' | 'updatedAt' | 'sector' | 'employee'
  > & {employeeId: string}
>

export class Update {
  constructor(private readonly workstationService: WorkstationService) {}

  async execute(
    id: string,
    sectorId: string,
    newWorkstation: WorkstationUpdateRequest
  ) {
    return this.workstationService.update(id, sectorId, newWorkstation)
  }
}
