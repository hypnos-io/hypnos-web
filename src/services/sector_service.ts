import {Sector} from '../entities/sector'

export const PATH = '/sectors'

export class SectorService {
  async fetchAll(): Promise<Sector[]> {
    return [
      {
        _id: '123',
        value: 'Setor 1',
      },
      {
        _id: '1234',
        value: 'Setor 2',
      },
      {
        _id: '1235',
        value: 'Setor 3',
      },
    ]
  }
}
