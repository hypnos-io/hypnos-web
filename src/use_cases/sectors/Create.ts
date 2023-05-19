import {Sector} from '../../entities/sector'
import {SectorService} from '../../services/sector_service'

export class Create {
  constructor(private readonly sectorService: SectorService) {}

  async execute(newSector: Omit<Sector, '_id' | 'createdAt' | 'updatedAt'>) {
    return this.sectorService.create(newSector)
  }
}
