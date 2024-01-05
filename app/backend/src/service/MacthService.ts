import MatchesModel from '../database/models/MacthesModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchesModel = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<MatchesModel[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
