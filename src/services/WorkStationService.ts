import { Workstation } from "../entities/workstation";

export default class WorkStationService {
  async register(){
  }

  async fetchAll(): Promise<number>{
    return Math.random() * 10;;
  }

  /*async fetchAll(): Promise<Workstation[] | null> {
    try {
      const response = await fetch('http://127.0.0.1:5173/workstations');
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        return data;
      } else {
        console.error('Response is not in JSON format');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }*/
  

}