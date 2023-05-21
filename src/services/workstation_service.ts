import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'
import {WorkstationUpdateRequest} from '../use_cases/workstation/Update'

const PATH = '/sectors/6460b7e7e036ed7f57e312a2/workstations'

export class WorkstationService {
  async fetchAll(): Promise<Workstation[]> {
    const {data} = await api.get<Workstation[]>(PATH)
    return data
  }

  async fetchAllBySector(sectorId: string): Promise<Workstation[]> {
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
