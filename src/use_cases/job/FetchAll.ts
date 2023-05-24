import { Process } from '../../entities/process';
import {JobService} from '../../services/job_service';

export class FetchAll {
  constructor(private readonly jobService: JobService) {}

  async execute(process: Process) {
    return this.jobService.fetchAll(process);
  }
}
