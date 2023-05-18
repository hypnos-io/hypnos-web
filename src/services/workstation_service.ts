import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'
import {WorkstationUpdateRequest} from '../use_cases/workstation/Update'

const PATH = '/workstations'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    return data
  }

  async fecthAllBySector(sectorId: string): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(`/sectors/${sectorId}${PATH}`)
    return data
  }

  async update(
    id: string,
    sectorId: string,
    newWorkstation: WorkstationUpdateRequest
  ): Promise<Workstation> {
    const {data} = await api.patch<Workstation>(
      `/sectors/${sectorId}${PATH}/${id}`,
      newWorkstation
    )
    return data
  }

  async create(
    sectorId: string,
    newWorkstation: Workstation
  ): Promise<Workstation> {
    const {data} = await api.post<Workstation>(
      `/sectors/${sectorId}${PATH}`,
      newWorkstation
    )
    return data
  }
}
