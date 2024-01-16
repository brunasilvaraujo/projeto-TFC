import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboaderService = new LeaderboardService(),
  ) { }

  public async findAllLeaderboardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboaderService.findAllLeaderboardHome();
    res.status(status).json(data);
  }
}
