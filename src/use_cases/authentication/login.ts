import { LoginService } from '../../services/login_service';

export class Login {
  constructor(private readonly loginService: LoginService) {}

  async execute(registration: string, password: string) {
    return this.loginService.login(registration, password);
  }
}