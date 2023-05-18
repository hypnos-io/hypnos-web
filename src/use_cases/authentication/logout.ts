import { LogoutService } from '../../services/logout_service';

export class Logout {
  constructor(private readonly logoutService: LogoutService) {}

  async execute() {
    return this.logoutService.logout();
  }
}