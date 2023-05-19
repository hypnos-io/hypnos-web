import {api} from '../api/axios';
import {Job} from '../entities/job';
import { Process } from '../entities/process';

//            /processes/:id/jobs
const PATH = '/processes';

export class JobService {
  async fetchAll(process: Process): Promise<Job[]> {
    const {data} = await api.get<Job[]>(`${PATH}/${process._id}/jobs`);
    return data;
  }

  async delete(process: Process, job: Job) {
    const {data} = await api.delete<Job>(`${PATH}/${process._id}/jobs/${job._id}`);
    return data;
  }
}
