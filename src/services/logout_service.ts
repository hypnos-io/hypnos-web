import { api } from '../api/axios';

const PATH = '/logout';

export class LogoutService {
    async logout(): Promise<any> {
        try {
            const response = await api.post(PATH);
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}