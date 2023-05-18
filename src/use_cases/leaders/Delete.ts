import { LeaderService } from "../../services/leader_service";

export class DeleteLeader {
  constructor(private readonly leaderService: LeaderService) {}

  async execute(id: string): Promise<void>{

    await this.leaderService.delete(id);

  }
}