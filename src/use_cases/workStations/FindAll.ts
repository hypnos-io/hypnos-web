import WorkStationService from "../../services/WorkStationService";

export class FindAll {
  constructor(private readonly workStationService: WorkStationService){}

  async execute() {
    return this.workStationService.fetchAll();
  }

}