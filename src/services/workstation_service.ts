import {Workstation} from '../entities/workstation'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    return [
      {
        value: '001',
      },
      {
        value: '002',
      },
      {
        value: '003',
      },
      {
        value: '004',
      },
    ]
  }
}
