import { api } from '../api/axios';

const PATH = '/login';

export class LoginService {
    async login(registration: string, password: string): Promise<any> {
        try {
            const response = await api.post(PATH, {
                registration: registration,
                password: password
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}