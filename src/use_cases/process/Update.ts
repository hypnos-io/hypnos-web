import { Process } from '../../entities/process';
import {ProcessService} from '../../services/process_service';

export class Update {
  constructor(private readonly processService: ProcessService) {}

  async execute(process: Process, name: string) {
    return this.processService.patch(process, name);
  }
}
