import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'

const PATH = '/sectors/6460b7e7e036ed7f57e312a2/workstations'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    return data
  }
}
