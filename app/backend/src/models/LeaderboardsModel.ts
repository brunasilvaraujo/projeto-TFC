import sequelize = require('sequelize');
import ILeaderboardModel from '../Interfaces/leaderboard/ILeaderboardModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class LeaderboardsModel implements ILeaderboardModel {
  private model = MatchesModel;
  private infoTeam = [
    [sequelize.col('homeTeam.team_name'), 'name'],
    [sequelize.literal(`sum(home_team_goals > away_team_goals)*3 
    + sum(home_team_goals = away_team_goals)`), 'totalPoints'],
    [sequelize.fn('count', sequelize.col('*')), 'totalGames'],
    [sequelize.literal('sum(home_team_goals > away_team_goals)'), 'totalVictories'],
    [sequelize.literal('sum(home_team_goals = away_team_goals)'), 'totalDraws'],
    [sequelize.literal('sum(home_team_goals < away_team_goals)'), 'totalLosses'],
    [sequelize.fn('sum', sequelize.col('home_team_goals')), 'goalsFavor'],
    [sequelize.fn('sum', sequelize.col('away_team_goals')), 'goalsOwn'],
    [sequelize.literal('sum(home_team_goals) - sum(away_team_goals)'), 'goalsBalance'],
    [sequelize.literal(`(100*(sum(home_team_goals > away_team_goals)*3
    + sum(home_team_goals = away_team_goals)) / (count(*)*3))`), 'efficiency'],
  ] as sequelize.FindAttributeOptions;

  public async findAllLeaderboardHome(): Promise<IMatch[]> {
    const leaderboardsTeams = await this.model.findAll({
      include: {
        model: TeamsModel,
        as: 'homeTeam',
        attributes: [],
      },
      attributes: this.infoTeam,
      where: { inProgress: false },
      group: ['home_team_id'],
      order: [
        ['totalPoints', 'DESC'],
        ['totalVictories', 'DESC'],
        ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'],
      ],
    });
    return leaderboardsTeams;
  }
}
