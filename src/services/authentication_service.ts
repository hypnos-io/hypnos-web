import { api } from '../api/axios';

const PATH = '/authenticated';

export class AuthenticationService {
    async authenticate(): Promise<any> {
        try {
            const response = await api.get(PATH, {
                withCredentials: true,
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}