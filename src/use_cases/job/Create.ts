import {Job} from '../../entities/job'
import {JobService} from '../../services/job_service'

export type JobRequest = Omit<
  Job,
  '_id' | 'createdAt' | 'updatedAt' | 'sector' | 'process'
>

export class Create {
  constructor(private readonly jobService: JobService) {}

  async execute(processId: string, newJob: JobRequest) {
    return this.jobService.create(processId, {...newJob})
  }
}
