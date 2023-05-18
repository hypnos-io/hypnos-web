import {api} from '../api/axios'
import {Workstation} from '../entities/workstation'

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
    newWorkstation: Partial<Workstation>
  ): Promise<Workstation> {
    const {data} = await api.patch<Workstation>(
      `/sectors/${sectorId}${PATH}/${id}`,
      newWorkstation
    )
    return data
  }

  async create(
    sectorId: string,
    newWorkstation: Omit<
      Workstation,
      '_id' | 'createdAt' | 'updatedAt' | 'employee' | 'sector'
    >
  ): Promise<Workstation> {
    const {data} = await api.patch<Workstation>(
      `/sectors/${sectorId}${PATH}`,
      newWorkstation
    )
    return data
  }
}
