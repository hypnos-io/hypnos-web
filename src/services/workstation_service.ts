import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'

const PATH = '/workstations'

export class WorkstationService {
  [x: string]: any
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    console.log(data)
    return data
  }
}
