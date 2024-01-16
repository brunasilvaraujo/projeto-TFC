import LeaderboardsModel from '../models/LeaderboardsModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardsModel(),
  ) { }

  public async findAllLeaderboardHome() {
    const leaderboaders = await this.leaderboardModel.findAllLeaderboardHome();
    return { status: 200, data: leaderboaders };
  }
}
