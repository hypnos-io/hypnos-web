import WorkStationService from "../../services/WorkStationService";

export class FindAll {
  private workStationService: WorkStationService;

  constructor(workStationService: WorkStationService){
    this.workStationService = workStationService;
  }

  async execute(): Promise<number> {
    const data = await this.workStationService.fetchAll();
    return data;
  }

}
