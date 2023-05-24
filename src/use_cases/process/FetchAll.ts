import {ProcessService} from '../../services/process_service';

export class FetchAll {
  constructor(private readonly processService: ProcessService) {}

  async execute() {
    return this.processService.fetchAll();
  }
}
