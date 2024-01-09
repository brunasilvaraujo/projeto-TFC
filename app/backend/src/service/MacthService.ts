import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchesModel = new MatchModel(),
  ) { }

  public async findAll(status: string | undefined) {
    if (status !== undefined) {
      const inProgress = status === 'true';
      const matches = await this.matchesModel.matchesProgress(inProgress);
      return matches;
    }
    const allMatch = await this.matchesModel.findAll();
    return allMatch;
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishedMatchers(id: number) {
    await this.matchesModel.finishedMatchers(id);
  }

  public async updateMatchers(id: number, homeTeamGoals: number, awayTeamGoals: number)
    :
    Promise<ServiceResponse<IMatch>> {
    const match = await this.matchesModel.findById(id);

    if (!match) return { status: 'NOT_FOUND', data: { message: 'Not found id' } };

    const updateMatch = { ...match, homeTeamGoals, awayTeamGoals };
    const matchGoals = await this.matchesModel
      .updateMatchers(id, updateMatch);

    if (!matchGoals) return { status: 'NOT_FOUND', data: { message: 'Not found' } };

    return { status: 'SUCCESSFUL', data: matchGoals };
  }
}
