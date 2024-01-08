// import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { IMatch } from '../Interfaces/matches/IMatch';
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

  public async finishedMatchers(id: number) {
    await this.matchesModel.finishedMatchers(id);
  }
}
