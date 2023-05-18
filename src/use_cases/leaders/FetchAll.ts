import { LeaderService } from "../../services/leader_service";

export class FetchAllLeaders {
  constructor(private readonly leaderService: LeaderService) {}

  async execute() {
    const foundLeaders = await this.leaderService.fetchAll();
    return foundLeaders;
  }
}