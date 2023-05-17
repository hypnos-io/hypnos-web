import {SectorService} from '../../services/sector_service'

export class FetchAll {
  constructor(private readonly sectorService: SectorService) {}

  async execute() {
    return this.sectorService.fetchAll()
  }
}
