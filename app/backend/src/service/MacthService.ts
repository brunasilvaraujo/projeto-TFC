import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchesModel = new MatchModel(),
  ) { }

  public async findAll(status: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    if (status !== undefined) {
      const inProgress = status === 'true';
      const matches = await this.matchesModel.matchesProgress(inProgress);
      return { status: 'SUCCESSFUL', data: matches };
    }
    const allMatch = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatch };
  }
}
