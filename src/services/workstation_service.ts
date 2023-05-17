import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'

const PATH = '/workstations'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    return data
  }

  async fecthAllBySector(sectorId: string): Promise<Workstation[]> {
    return [
      {
        _id: '123',
        value: 'Posto 1',
      },
      {
        _id: '1234',
        value: 'Posto 1',
      },
      {
        _id: '1235',
        value: 'Posto 1',
      },
    ]
  }
}
