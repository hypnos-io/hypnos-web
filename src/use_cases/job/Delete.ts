import { Job } from '../../entities/job';
import { Process } from '../../entities/process';
import {JobService} from '../../services/job_service';

export class Delete {
  constructor(private readonly jobService: JobService) {}

  async execute(process: Process, job: Job) {
    return this.jobService.delete(process, job);
  }
}
