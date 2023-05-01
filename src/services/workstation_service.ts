import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'

const PATH = '/workstations'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    return data
  }
}
