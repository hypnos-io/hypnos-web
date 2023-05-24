import {ProcessService} from '../../services/process_service';

export class Create {
  constructor(private readonly processService: ProcessService) {}

  async execute(name: string) {
    return this.processService.create(name);
  }
}
