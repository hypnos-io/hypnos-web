import {api} from '../api/axios';
import {Process} from '../entities/process';

const PATH = '/processes';

export class ProcessService {
  async fetchAll(): Promise<Process[]> {
    const {data} = await api.get<Process[]>(PATH);
    return data;
  }

  async create(name: string): Promise<Process> {
    const {data} = await api.post(PATH, {
      name: name,
    });
    return data;
  }

  async patch(process: Process, name: string): Promise<Process> {
    const {data} = await api.patch(`${PATH}/${process._id}`, {
      name: name,
    });
    return data;
  }
}
