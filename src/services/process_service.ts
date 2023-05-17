import {api} from '../api/axios';
import {Process} from '../entities/process';

const PATH = '/processes';

export class ProcessService {
  async fetchAll(): Promise<Process[]> {
    const {data} = await api.get<Process[]>(PATH);
    return data;
  }
}
