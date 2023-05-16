import { AuthenticationService } from '../../services/authentication_service';

export class Authenticate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async execute() {
    return this.authenticationService.authenticate();
  }
}