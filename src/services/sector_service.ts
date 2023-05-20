import {api} from '../api/axios'
import {Sector} from '../entities/sector'

export const PATH = '/sectors'

export class SectorService {
  async fetchAll(): Promise<Sector[]> {
    const {data} = await api.get<Sector[]>(PATH)
    return data
  }

  async create(newSector: Sector): Promise<Sector> {
    const {data} = await api.post<Sector>(PATH, newSector)
    return data
  }
}
